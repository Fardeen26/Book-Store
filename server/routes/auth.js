import express from 'express';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin.js';
import { Student } from '../models/Student.js';
const router = express.Router();

router.post('/login', async (req, res) => {

    try {
        const { username, password, role } = req.body;
        if (role == 'admin') {

            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.json({ message: "The admin is not found!" });
            }

            const validPassword = await bcrypt.compare(password, admin.password);

            if (!validPassword) {
                return res.json({ message: "Invalid Password" });
            }

            const token = Jwt.sign({ username: admin.username, role: 'admin' }, process.env.ADMIN_KEY);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'admin' });

        }
        else if (role == 'student') {
            const student = await Student.findOne({ username });

            if (!student) {
                return res.json({ message: "The student is not found!" });
            }

            const validPassword = await bcrypt.compare(password, student.password);

            if (!validPassword) {
                return res.json({ message: "Invalid Password" });
            }

            const token = Jwt.sign({ username: student.username, role: 'student' }, process.env.STUDENT_KEY);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'student' });

        }
        else {

        }
    } catch (error) {
        return res.json({ message: "There is an error in registring the Admin!" });
    }

});

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid Admin" });
    }
    else {
        Jwt.verify(token, process.env.ADMIN_KEY, (err, decoded) => {
            if (err) {
                return res.json({ message: "Tnvalid Token" });
            }
            else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    };
};

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid User" });
    }
    else {
        Jwt.verify(token, process.env.ADMIN_KEY, (err, decoded) => {
            if (err) {
                Jwt.verify(token, process.env.STUDENT_KEY, (err, decoded) => {
                    if (err) {
                        return res.json({ message: "Tnvalid Token" });
                    }
                    else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next();
                    }
                });
            }
            else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    };
};

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role});
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
});


export { router as AdminRouter, verifyAdmin };
import express from 'express';
import bcrypt from 'bcrypt';
import { Student } from '../models/Student.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/register', verifyAdmin, async (req, res) => {
    try {
        const { username, password, roll, grade } = req.body;
        const student = await Student.findOne({username});

        if(student) {
            return res.json({ message: "student is registered!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student( {
            username,
            password: hashPassword, 
            roll,
            grade
        });

        await newStudent.save();
        return res.json({ registered: true });
    } catch (error) {
        return res.json({ message: "There is an error in registring student!"});
    }
});

export { router as studentRouter };
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3001;
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AdminRouter } from './routes/auth.js';
import './db.js';
import { studentRouter } from './routes/student.js';
import { bookRouter } from './routes/book.js';
import { Admin } from './models/Admin.js';
import { Book } from './models/Book.js';
import { Student } from './models/Student.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5174'],
    credentials: true
}));
app.use(cookieParser());
app.use('/api/auth', AdminRouter);
app.use('/api/student', studentRouter);
app.use('/api/book', bookRouter);

app.get('/api/dashboard', async (req, res) => {
    try {
        const student = await Student.countDocuments();
        const admin = await Admin.countDocuments();
        const book = await Book.countDocuments();
        return res.json({ ok: true, student, admin, book });
    } catch (error) {
        return res.json(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
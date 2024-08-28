import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
// const path = require('path')
import path from 'path'
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

app.use(cors({
    origin: 'https://book-store-six-azure.vercel.app',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', AdminRouter);
app.use('/api/student', studentRouter);
app.use('/api/book', bookRouter);

app.get('/api/demoroute', (req, res) => {
    res.json({ message: "Hello, book lovers!" });
})

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

app.listen(3001, () => {
    console.log(`Server is running on port 3001 ${port}`);
});

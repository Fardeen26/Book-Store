import express from 'express';
import { Book } from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, author, imageUrl } = req.body;
        const newBook = new Book({
            name,
            author,
            imageUrl
        });
        await newBook.save();
        return res.json({ added: true });
    } catch (error) {
        return res.json({ message: "There is an error in adding book!" });
    }
});

router.get('/demobooks', (req, res) => {
    return res.send({
        id: 1,
        name: "Do Epic Shit",
        author: "Ankoor Wariko,
    })
})

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        return res.json(books);
    } catch (error) {
        return res.json(error);
    }
});

router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({ _id: id })
        return res.json(book);
    } catch (error) {
        return res.json(err);
    }
});

router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate({ _id: id }, req.body)
        return res.json({ updated: true, book });
    } catch (error) {
        return res.json(err);
    }
});

router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({ _id: id });
        return res.json({ deleted: true, book });
    } catch (error) {
        return res.json(err);
    }
})

export { router as bookRouter };

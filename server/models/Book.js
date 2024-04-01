import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: { type: String },
    author: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
});

const Book = mongoose.model('Book', bookSchema);
export { Book };
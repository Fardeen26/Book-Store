import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    roll: { type: String },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    grade: { type: String }
});

const Student = mongoose.model('Student', studentSchema);
export { Student };
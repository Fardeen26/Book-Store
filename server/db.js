import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
    try {
        mongoose.connect(process.env.MONGO_ATLASDB_URL)
        console.log("connected");
    } catch (error) {
        console.log(error)
    }
}

Connection();
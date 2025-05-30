import mongoose from 'mongoose';
import { app } from './app'

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY is missing!!!");
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing!!!");
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB");
    }

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
};

start();
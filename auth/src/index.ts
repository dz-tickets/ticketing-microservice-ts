import mongoose from 'mongoose';
import { app } from './app'

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY is missing!!!")
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB");
    }

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
};

start();
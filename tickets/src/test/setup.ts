import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from 'jsonwebtoken';

declare global {
    var getCookie: () => string[];
}

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
    process.env.JWT_KEY = "jwtKey";
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {});
}, 20000);

beforeEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if (mongoServer) {
        await mongoServer.stop();
    }
    await mongoose.connection.close();
});

global.getCookie = () => {
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.org"
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return [`session=${base64}`];
};
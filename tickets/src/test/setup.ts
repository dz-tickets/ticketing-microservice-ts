import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../app";
import request from "supertest";

declare global {
    var getCookie: () => Promise<string[]>;
}

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
    process.env.JWT_KEY = "jwtKey";
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {});
}, 20000);

beforeEach(async () => {
    if(mongoose.connection.db) {
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

global.getCookie = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');
    if(cookie === undefined) {
        throw new Error('Missing cookie');
    }

    return cookie;
};
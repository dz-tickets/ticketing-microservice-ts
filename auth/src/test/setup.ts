import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../app";

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

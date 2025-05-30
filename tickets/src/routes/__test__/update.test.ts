import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.getCookie())
        .send({
            title: "my title",
            price: 20
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "my title",
            price: 20
        })
        .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getCookie())
        .send({
            title: "my title",
            price: 20
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.getCookie())
        .send({
            title: 'random title',
            price: 20
        })
        .expect(401);
});

it('return 400 if the user provides an invalid title or price', async () => {
    const cookie = global.getCookie();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: "my title",
            price: 20
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 123
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'hello title',
            price: -10
        })
        .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.getCookie();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: "my title",
            price: 20
        })
        .expect(201);

    const expectedTitle = 'new changed title';
    const expectedPrice = 123;
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: expectedTitle,
            price: expectedPrice
        })
        .expect(200);

    const responseGet = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(responseGet.body.title).toEqual(expectedTitle);
    expect(responseGet.body.price).toEqual(expectedPrice);
});
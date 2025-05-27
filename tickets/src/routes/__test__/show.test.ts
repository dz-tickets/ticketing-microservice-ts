import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
});


it('returns 400 if the id is not correct', async () => {
    await request(app)
        .get('/api/tickets/asdaqweasd123')
        .send()
        .expect(400);
});

it('returns the ticket if the ticket is found', async () => {
    const expectedTitle = 'MyTitle';
    const expectedPrice = 45;
    const createResponse = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getCookie())
        .send({
            title: expectedTitle,
            price: expectedPrice
        })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${createResponse.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(expectedTitle);
    expect(ticketResponse.body.price).toEqual(expectedPrice);
});
import request from "supertest";
import {app} from "../../app"

it('response with details about the current user', async () => {
    const cookie = await getCookie();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with error if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', [])
        .send()
        .expect(401);

    expect(response.body.errors[0].message).toEqual("Not authorized");
});
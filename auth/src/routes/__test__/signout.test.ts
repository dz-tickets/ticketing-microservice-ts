import request from "supertest";
import {app} from "../../app"

it('clears the cookie after signout', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'randomPassword'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);

    const cookie = response.get('Set-Cookie');
    if(cookie === undefined) {
        throw new Error('Missing cookie');
    }
    expect(cookie[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});



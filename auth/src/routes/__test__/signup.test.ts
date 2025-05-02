import request from "supertest";
import {app} from "../../app"

it('return a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'randomPassword'
        })
        .expect(201);
});

it('returns a 400 with an invalid email address', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalidemail@mailes',
            password: 'randomPassword'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'mymail@mail.com',
            password: 'a'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('disallow assign with the same email', async () => {
   await request(app)
       .post('/api/users/signup')
       .send({
           email: 'myemail@example.com',
           password: 'my_password'
       })
       .expect(201);

   return request(app)
       .post('/api/users/signup')
       .send({
           email: 'myemail@example.com',
           password: 'my_password'
       })
       .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'myemail@example.com',
            password: 'my_password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
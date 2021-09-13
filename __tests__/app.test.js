'use strict';
require("dotenv").config();
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);
const base64 = require('base-64');


let obj = {
    title: 'food delivery',
    image: 'tbfdsdsad3rg3egs54',
    description: "food delivery for client",
    phoneNumber: "0790909990"

}


describe('Auth Tests', () => {
    let obj = {
        username: 'ask83',
        password: 'osama1222'
    }

    it('sign up test  ', async () => {

        const response = await request.post('/signup').send(obj); // async
        expect(response.status).toEqual(201);


    });

    it('sign in test  ', async () => {


        const response = await request.post('/signin')
            .auth('ask83', 'osama1222')
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.user).toBeDefined();
        expect(userObject.token).toBeDefined()


    });

    it('basic fails with unknown user', async () => {
        const response = await request.post('/signin')
            .auth('', 'test@12341')
        const userObject = response.body;
        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined()
    });

    it(' ADMIN TEST ROUTE FOR GETTING USERS  ', async () => {

        const response = await request.post('/signin').auth('ask83', 'osama1222');


        const token = response.body.token;

        const bearerResponse = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });





})
describe('my API Server', () => {

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation();
    })

    // add scenarios & test cases 
    it('handles not found request', async () => {

        const response = await request.get('/asd'); // async
        expect(response.status).toEqual(404);
    });



    it('handles my internal server errors', async () => {
        const response = await request.get('/product/bad'); // async
        expect(response.status).toEqual(500);
    });


    it('/ route works', async () => {
        const response = await request.get('/'); // async
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('This is the home page for API');
    });


});

/*************************************************************** */
describe('WORKING ROUTE: product (authenticated API) routes', () => {


    it(' get product  ', async () => {

        const response = await request.post('/signin').auth('ask83', 'osama1222');


        const token = response.body.token;

        const bearerResponse = await request
            .get('/v1/order')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });

    it(' post product  ', async () => {

        const response = await request.post('/signin').auth('ask83', 'osama1222');


        const token = response.body.token;

        const bearerResponse = await request
            .post('/v1/order')
            .send(obj)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });


    it(' update product  ', async () => {

        const response = await request.post('/signin').auth('ask83', 'osama1222');


        const token = response.body.token;

        const bearerResponse = await request
            .put('/v1/order/1')
            .send(obj)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });


    it(' delete product  ', async () => {

        const response = await request.post('/signin').auth('ask83', 'osama1222');


        const token = response.body.token;

        const bearerResponse = await request
            .delete('/v1/order/1')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });

});
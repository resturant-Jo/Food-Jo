'use strict';
const port =3000;
var faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const connectionToCaps=io.connect('http://localhost:3000');
const connectionToCapsNameSpace=io.connect(`${host}/caps`);
const STORE_NAME=process.env.STORE_NAME || 'Seattle Breakfast';



function pickup(payload){
    let order={
        store:STORE_NAME,
        orderID:faker.datatype.uuid(),
        customer:faker.name.findName(),
        address:faker.address.city()
    }

        connectionToCapsNameSpace.emit('pickup',order);
}

setInterval(function() {
    pickup()
}, 5000)






        connectionToCapsNameSpace.on('ThankYou', ThankYouFunc)

        function ThankYouFunc (payload){
            console.log(`Thank you for delivering ${payload.orderID}`)
        }

     
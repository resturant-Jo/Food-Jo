'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const connectionToCapsNameSpace=io.connect(`${host}/caps`);


connectionToCapsNameSpace.on('received', received)

function received(payload) {

    console.log(`Received. Thank you.`, payload.orderID)
    setTimeout(() => {
        connectionToCapsNameSpace.emit('customerReceived', payload)
    }, 1000)}



'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const connectionToCapsNameSpace=io.connect(`${host}/caps`);

connectionToCapsNameSpace.on('driverPickup',transitPackage);

function transitPackage(payload){

    
    console.log(`DRIVER: picked up ${payload.orderID}`);
    setTimeout(() => {
    
    connectionToCapsNameSpace.emit('in-transit',payload);
   
}, 1500);}

connectionToCapsNameSpace.on('delivered', deliveredPackage)

function deliveredPackage(payload){
    console.log(`DRIVER: Delivered Package ${payload.orderID}`)
    setTimeout(() => {
        connectionToCapsNameSpace.emit('deliveredPackage', payload)
    }, 2000)}
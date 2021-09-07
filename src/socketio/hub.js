"use strict";

// const events = require("./events");


const port = 3000;
const io = require("socket.io")(port);

const caps = io.of("/caps");

  caps.on("connection", (socket) => {
    // console.log('connected to caps namespace');

    socket.on("pickup", (payload) => {
      let Event = {
        event: "pickup",
        time: new Date(),
        payload: payload,
      };
      console.log("Event", Event);
      caps.emit("driverPickup", payload);
    });

    socket.on("in-transit", (payload) => {
      let Event = {
        event: "in-transit",
        time: new Date(),
        payload: payload,
      };
      console.log("Event", Event);
      caps.emit("delivered", payload);

    });



    socket.on("deliveredPackage", (payload) => {
      let Event = {
        event: "delivered",
        time: new Date(),
        payload: payload,
      };
      console.log("Event", Event);
      caps.emit('ThankYou', payload)
      caps.emit("received", payload);

    });
    socket.on("customerReceived", (payload) => {
      let Event = {
        event: "received",
        time: new Date(),
        payload: payload,
      };
      console.log("Event", Event);

  
    });
  });



module.exports = caps;
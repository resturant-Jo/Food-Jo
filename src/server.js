'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const foodRoutes=require('./auth/routes/foodRoute');
const orderRoutes=require('./auth/routes/orderRoute');
const favRoutes=require('./auth/routes/favRoute');
const cartRoutes=require('./auth/routes/cartRoute');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes/routes');
const logger = require('./auth/middleware/logger');

// Prepare the express app
const app = express();
const router = express.Router();
// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------
const socket_io = require("socket.io");

var http = require('http').Server(app);
var socketio = require('socket.io');
const { Server } = require('http');

app.set('view engine', 'ejs')
app.use(express.static("public"));
// ----------------------------------
app.use(logger);

app.get('/', function (req, res) {
  res.send('This Is The Home For Api 🍕🍦🍗🍛🍔')
});

app.get('/client',(req,res)=>{
  res.sendFile(__dirname + "/Chat/index.html");
  
})

app.get('/driver',(req,res)=>{
  res.sendFile(__dirname + "/Chat/driver.html");
})


// Routes
app.use(authRoutes);
app.use('/v1',favRoutes);
app.use('/v2',cartRoutes);
app.use('/v3',orderRoutes);
app.use('/v4',foodRoutes);


// Catchalls
app.use('*',notFound);
app.use(errorHandler);

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`server is running ${port}`)

})
const io = socketio(server)

module.exports = {
  io: io,
  server: app,
 
  
};
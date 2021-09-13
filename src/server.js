'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const foodRoutes=require('./auth/routes/foodRoute');
const orderRoutes=require('./auth/routes/orderRoute');
const favRoutes=require('./auth/routes/favRoute');
// const adminRoutes=require('./auth/routes/restaurantRoute');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes/routes');
const logger = require('./auth/middleware/logger');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Routes
app.use(authRoutes);
app.use('/v1',orderRoutes);
app.use('/v2',favRoutes);
app.use(foodRoutes);
// app.use(adminRoutes);
// app.use('/api/v1', foodRoutes);


app.get('/',(req,res)=>{
  res.send('This is the home page for API');
})

// Catchalls
app.use('*',notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
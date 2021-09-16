"use strict";

require("dotenv").config();
// const app = require("./src/server.js");
const { db } = require("./src/auth/models/index");

db.sync().then(() => {
  // app.start(process.env.PORT || 3000);
  require('./src/server');
  require("./src/Chat/js/index");
  // require("./public/js/delivery");
  // require("./public/js/client");

})
.catch(console.error);
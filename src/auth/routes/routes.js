"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("../models/index");
const basicAuth = require("../middleware/basicAuth");
const bearerAuth = require("../middleware/bearerAuth");
const permissions = require("../middleware/acl.js");

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get(
  "/users",
  bearerAuth,
  permissions("delete"),
  async (req, res, next) => {
    const userRecords = await users.findAll({});
    const list = userRecords.map((user) => user);
    res.status(200).json(list);
  }
);

authRouter.delete(
  "/delete/:id",
  bearerAuth,
  permissions("delete"),
  async (req, res, next) => {
    let id = parseInt(req.params.id);
    let result = await users.deleteUser(id);
    res.json(result);
  }
);

authRouter.put(
  "/update/:id",
  bearerAuth,
  permissions("update"),
  async (req, res, next) => {
    let id = parseInt(req.params.id);
    let result =await users.updateUser(id,req.body);
    res.json(result);
  }
);

// authRouter.delete('/deleteAccount', bearerAuth, async (req, res, next) => {
//     const id = req.userId

//     await users.destroy({ where: { id: id } })

//     res.send('Account Deleted');

//   });

// authRouter.get('/secret', bearerAuth, async (req, res, next) => {
//   res.status(200).send('Welcome to the secret area')
// });

module.exports = authRouter;

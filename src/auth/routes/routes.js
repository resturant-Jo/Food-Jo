
'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('../middleware/basicAuth');
const bearerAuth = require('../middleware/bearerAuth');
const permissions = require('../middleware/acl.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

authRouter.put("/updateaccount", bearerAuth, async (req, res) => {
  const id = req.userId;
  let userRecord = await users.findOne({ where: { id: id } });
  const output = req.body;
  output.token = userRecord.token;
  const update = await userRecord.update(output);
  res.send(update);
});

authRouter.delete("/deleteaccount", bearerAuth, async (req, res) => {
  const id = req.userId;
  await users.destroy({ where: { id: id } });
  res.send("your account deleted successfully");
});

authRouter.delete("/deleteuser/:id", bearerAuth, permissions("delete"),
  async (req, res) => {
    const id = req.params.id;
    await users.destroy({ where: { id: id } });
    const userRecords = await users.findAll({});
    const list = await userRecords.map((user) => user);
    res.send(list);
  }
);
module.exports = authRouter;
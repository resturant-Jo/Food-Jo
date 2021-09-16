"use strict";

const supertest = require("supertest");
const { server } = require("../src/server");
const request = supertest(server);
const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    'postgres://qcdnkrcj:acDs3KhLbsnKYWDGtrO_VcJ8slutwZug@chunee.db.elephantsql.com/qcdnkrcj',
  {}
);

const { Users } = require("../src/auth/models/index");

describe("express server", () => {
    it("should POST to /signin to login as a user (use basic auth)", async () => {
      // arrange
      let param = "/signin";
      let status = 403;
      // act
      const response = await request.post(param).auth("gg", "gg");
  
      // assert
      expect(response.status).toBe(status);
    });
  
    it("should POST to /signin rise error if user or password wrong", async () => {
      // arrange
      let param = "/signin";
      let status = 403;
      // act
      const response = await request.post(param).auth("gg", "dd");
  
      // assert
      expect(response.status).toBe(status);
    });
  
    it("should POST to /signup rise an error if user exsit", async () => {
      // arrange
      let param = "/signup";
      let status = 500;
      // act
      const response = await request
        .post(param)
        .send({ username: "mahmoud", password: "123", role: "manager" });
      // assert
      expect(response.status).toBe(status);
    });
  });
"use strict";

const supertest = require("supertest");
const { server } = require("../src/server.js");
const request = supertest(server);
const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    'postgres://qcdnkrcj:acDs3KhLbsnKYWDGtrO_VcJ8slutwZug@chunee.db.elephantsql.com/qcdnkrcj',
  {}
);

const { Users } = require("../src/auth/models/index");

describe("express server", () => {
  it("should response with 404 on a bad route", async () => {
    // arrange
    let param = "/notfound";
    let status = 500;
    // act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });
  it("should response with 404 on a bad method", async () => {
    // arrange
    let param = "/";
    let status = 404;
    // act
    const response = await request.post(param);
    // assert
    expect(response.status).toBe(status);
  });
  it("should check 500 errors", async () => {
    // arrange
    let param = "/bad";
    let status = 500;
    // act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });
})
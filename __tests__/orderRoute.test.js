"use strict";

const supertest = require("supertest");
const { server } = require("../src/server.js");
const request = supertest(server);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

describe("express server", () => {
  it("should GET to /v1/order response with 200 OK if authorized", async () => {
    // arrange
    let param = "/v1/order";
    let status = 500;
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haG1vdWQxIiwiaWF0IjoxNjMxMzc0MjkxfQ.JHIVEb9GIPUPYA6OWpgsXNw9QtwicJKF0DGakV0yUNc";
    // act
    const response = await request
      .get(param)
      .set("Authorization", `Bearer ${token}`)
      .send({ foodId: 1, cartId: 6 });

    // assert
    expect(response.status).toBe(status);
  });

   it("should GET to /v1/order response with 500 OK if not authorized", async () => {
    // arrange
    let param = "/v1/order";
    let status = 500;
    // act
    const response = await request.get(param);

    // assert
    expect(response.status).toBe(status);
  });
})
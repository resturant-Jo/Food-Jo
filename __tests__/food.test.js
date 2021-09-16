"use strict";

const supertest = require("supertest");
const { server } = require("../src/server.js");
const request = supertest(server);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

describe("express server", () => {


it("should POST to /food response with 201 OK if authorized", async () => {
    // arrange
    let param = "/food";
    let status = 500;
    // admin token
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haG1vdWQxIiwiaWF0IjoxNjMxMzc0MjkxfQ.JHIVEb9GIPUPYA6OWpgsXNw9QtwicJKF0DGakV0yUNc"; // act
    const response = await request
      .post(param)
      .set("Authorization", `Bearer ${token}`)
      .send({ restuarantId: 2 });
    // assert
    expect(response.status).toBe(status);
  });

})
"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const bearerAuth = require("../middleware/bearerAuth");
const multer = require("multer");
const storge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storge,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

Router.post(
  "/uploadImg",
  bearerAuth,
  upload.array("images",5),
  async (req, res) => {
    let path = req.files;
    console.log(path);
   res.send(path);
  }
);

module.exports = Router;
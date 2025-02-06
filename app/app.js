"use strict";

const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT;

//라우팅
const home = require("./src/routes/home");

//앱세팅
app.set("views", "./src/views"); //뷰를 뷰스 파일로
app.set("view engine", "ejs"); //뷰의 엔진을 ejs로

app.use(express.static(__dirname + "/src/public"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", home); //use는 미들웨어등록

module.exports = app;

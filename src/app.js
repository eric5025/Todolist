"use strict";

const express = require("express");
const app = express();

const port = 1000;

//라우팅
const home = require("./routes/home");

//앱세팅
app.set("views", "./views"); //뷰를 뷰스 파일로
app.set("view engine", "ejs"); //뷰의 엔진을 ejs로

app.use("/", home); //use는 미들웨어등록

module.exports = app;

"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.hello);
router.post("/newlist", ctrl.process.newlist);
router.get("/tasks", ctrl.output.getTasks);
router.post("/deleteTask", ctrl.process.deleteTask); // 삭제 API 추가

router.get("/a", ctrl.output.a);

module.exports = router;

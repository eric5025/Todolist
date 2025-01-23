"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.hello);

router.get("/a", ctrl.a);

module.exports = router;

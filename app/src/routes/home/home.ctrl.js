"use strict";

const hello = (req, res) => {
  res.render("home/todolist");
};

const a = (req, res) => {
  res.render("home/a");
};

module.exports = {
  hello,
  a,
};

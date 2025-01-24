"use strict";

const newlist = document.querySelector("#newlist"),
  addBtn = document.querySelector("button");

addBtn.addEventListener("click", add);
function add() {
  const req = {
    newlist: newlist.value,
  };
}

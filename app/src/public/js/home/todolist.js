"use strict";

const newlist = document.querySelector("#newlist"),
  addBtn = document.querySelector("button");

addBtn.addEventListener("click", add);
function add() {
  const req = {
    newlist: newlist.value,
  };
  fetch("/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
}

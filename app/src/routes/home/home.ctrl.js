"use strict";

const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../../data.json");

// 1. 서버 시작 시 data.json 파일에서 할 일 목록 불러오기
let list = { newlist: [] };
try {
  const data = fs.readFileSync("data.json", "utf8");
  list = JSON.parse(data);
} catch (err) {
  console.error("파일 읽기 에러:", err);
}

// 2. 데이터를 저장하는 함수
const saveData = () => {
  fs.writeFile("data.json", JSON.stringify(list, null, 2), (err) => {
    if (err) {
      console.error("파일 저장 에러:", err);
    }
  });
};

const output = {
  hello: (req, res) => {
    // 최신 데이터를 가져오기 위해 data.json을 다시 읽음
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error("파일 읽기 에러:", err);
        return res.render("home/todolist", { list: [] });
      }

      let parsedData;
      try {
        parsedData = JSON.parse(data); // JSON 파싱
      } catch (e) {
        console.error("JSON 파싱 에러:", e);
        parsedData = { newlist: [] };
      }

      res.render("home/todolist", { list: parsedData.newlist });
    });
  },

  a: (req, res) => {
    res.render("home/a");
  },

  getTasks: (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error("파일 읽기 에러:", err);
        return res.json({ tasks: [] });
      }

      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        console.error("JSON 파싱 에러:", e);
        parsedData = { newlist: [] };
      }

      res.json({ tasks: parsedData.newlist });
    });
  },
};

const process = {
  newlist: (req, res) => {
    if (!req.body.task) {
      return res
        .status(400)
        .json({ success: false, message: "할 일을 입력하세요!" });
    }

    list.newlist.push(req.body.task); // 새로운 할 일 추가
    saveData(); // 파일에 저장
    return res.status(200).json({ success: true, list: list.newlist });
  },

  deleteTask: (req, res) => {
    const taskToDelete = req.body.task;
    list.newlist = list.newlist.filter((task) => task !== taskToDelete); // 삭제

    saveData(); // 변경된 리스트를 파일에 저장
    return res.status(200).json({ success: true, list: list.newlist });
  },
};

module.exports = {
  output,
  process,
};

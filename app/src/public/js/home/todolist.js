document.addEventListener("DOMContentLoaded", function () {
  window.addTask = function () {
    let input = document.getElementById("newTask");
    let taskText = input.value.trim();

    if (taskText === "") {
      alert("할 일을 입력하세요!");
      return;
    }

    fetch("/newlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskText }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadTasks(); // 목록 새로 불러오기
        }
      })
      .catch((error) => console.error("Error:", error));

    input.value = "";
  };

  function loadTasks() {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => {
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // 기존 목록 삭제 후 새로 추가

        data.tasks.forEach((taskText) => {
          let taskDiv = document.createElement("div");
          taskDiv.classList.add("task");

          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.onclick = function () {
            taskTextSpan.classList.toggle("completed");
          };

          let taskTextSpan = document.createElement("span");
          taskTextSpan.textContent = taskText;

          let deleteBtn = document.createElement("button");
          deleteBtn.textContent = "삭제";
          deleteBtn.onclick = function () {
            fetch("/deleteTask", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ task: taskText }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  loadTasks(); // 삭제 후 목록 새로 불러오기
                }
              })
              .catch((error) => console.error("Error:", error));
          };

          taskDiv.appendChild(checkbox);
          taskDiv.appendChild(taskTextSpan);
          taskDiv.appendChild(deleteBtn);

          taskList.appendChild(taskDiv);
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  loadTasks(); // 페이지 로드 시 기존 데이터 불러오기
});

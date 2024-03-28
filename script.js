"use strict";

///////////////////

const formElement = document.getElementById("form");
const inputElement = document.getElementById("task-input");
const listElement = document.querySelector(".list");

//////////////////

const displayTask = function (taskItem) {
  const htmlElement = `<li ${taskItem.checked ? 'class="checked"' : ""}>
    <p>${taskItem.task}</p>
    <div>
      <button class="checked-btn" type="button">🗹</button>
      <button class="delete-btn" type="button">☒</button>
    </div>
    </li>`;
  listElement.insertAdjacentHTML("afterBegin", htmlElement);
  inputElement.value = "";
};

const addTask = function (taskText) {
  if (taskList.some((taskItem) => taskItem.task === taskText)) return;
  const newTask = { task: taskText, checked: false };
  taskList.push(newTask);
  displayTask(newTask);
  updateLocalStorage();
};

const checkTask = function (liElement) {
  liElement.classList.toggle("checked");
  taskList.find(
    (task) => task.task === liElement.querySelector("p").innerText
  ).checked = liElement.classList.contains("checked");
  updateLocalStorage();
};

const deleteTask = function (liElement) {
  taskList.splice(
    taskList.findIndex(
      (t) => t.task === liElement.querySelector("p").innerText
    ),
    1
  );
  updateLocalStorage();
  listElement.innerHTML = "";
  taskList.forEach((taskItem) => displayTask(taskItem));
};

const updateLocalStorage = function () {
  localStorage.setItem("tasks", JSON.stringify(taskList));
};

//////////////////

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = inputElement.value.trim();
  task && addTask(task);
});

listElement.addEventListener("click", (e) => {
  const liParentElement = e.target.closest("li");
  if (e.target.classList.contains("delete-btn")) {
    deleteTask(liParentElement);
  } else if (e.target.classList.contains("checked-btn")) {
    checkTask(liParentElement);
  }
});

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
taskList.forEach((taskItem) => displayTask(taskItem));

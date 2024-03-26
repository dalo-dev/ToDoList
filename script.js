"use strict";

///////////////////

const formElement = document.getElementById("form");
const inputElement = document.getElementById("task-input");
const listElement = document.querySelector(".list");

//////////////////

let taskList = JSON.parse(localStorage.getItem("tasks"));

const displayTask = function (task, order) {
  const htmlElement = `<li>
    <p>${task}</p>
    </li>`;
  listElement.insertAdjacentHTML(order, htmlElement);
  inputElement.value = "";
  updateLocalStorage();
};

const updateLocalStorage = function () {
  const tasksElements = listElement.querySelectorAll("li");
  const tasks = [];

  tasksElements.forEach((task) => {
    tasks.push({ task: task.innerText });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//////////////////

taskList &&
  taskList.forEach((taskItem) => displayTask(taskItem.task, "beforeend"));

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = inputElement.value.trim();
  task && displayTask(task, "afterBegin");
});

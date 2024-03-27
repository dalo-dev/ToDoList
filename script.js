"use strict";

///////////////////

const formElement = document.getElementById("form");
const inputElement = document.getElementById("task-input");
const listElement = document.querySelector(".list");

//////////////////

const displayTask = function (taskText) {
  const htmlElement = `<li>
    <p>${taskText}</p>
    <div>
      <button class="checked-btn" type="button">🗹</button>
      <button class="delete-btn" type="button">☒</button>
    </div>
    </li>`;
  listElement.insertAdjacentHTML("afterBegin", htmlElement);
  inputElement.value = "";
};

const addTask = function (taskText) {
  taskList.push({ task: taskText, checked: false });
  displayTask(taskText);
  updateLocalStorage();
};

const checkTask = function (liElement) {
  liElement.classList.toggle("checked");
  taskList.find(
    (task) => task.task === liElement.querySelector("p").innerText
  ).checked = liElement.classList.contains("checked");
};

const deleteTask = function (taskText) {
  taskList.splice(
    taskList.findIndex((t) => t.task === taskText),
    1
  );
  updateLocalStorage();
  listElement.innerHTML = "";
  taskList.forEach((taskItem) => displayTask(taskItem.task));
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
    const taskText = liParentElement.querySelector("p").innerText;
    deleteTask(taskText);
  } else if (e.target.classList.contains("checked-btn")) {
    checkTask(liParentElement);
  }
});

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
taskList.forEach((taskItem) => displayTask(taskItem.task));

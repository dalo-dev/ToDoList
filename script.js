"use strict";

///////////////////

const formElement = document.getElementById("form");
const inputElement = document.getElementById("task-input");
const listElement = document.querySelector(".list");

//////////////////

const displayTask = function (task) {
  const htmlElement = `<li>
    <p>${task}</p>
    </li>`;
  listElement.insertAdjacentHTML("afterBegin", htmlElement);
  inputElement.value = "";
};

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = inputElement.value.trim();

  if (task) {
    displayTask(task);
  }
});

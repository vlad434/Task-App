console.log("Client from task.js");

const token = localStorage.getItem("authToken");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskName = document.getElementById("task-name");
const taskCreatedAt = document.getElementById("task-created-at");
const taskContainer = document.getElementById("task-container");

document.addEventListener("DOMContentLoaded", getData);

//get all tasks
function getData() {
  const token = localStorage.getItem("authToken");
  fetch("/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => renderTasks(data));
}

//render tasks to UI
const renderTasks = (tasks) => {
  taskContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("flex");
    taskDiv.innerHTML = `
            <h3>${task.description}</h3>
            <p>${new Date(task.createdAt).toLocaleString()}</p>
            <button onclick="editTask()" class="px-5 py-0.5 border border-solid rounded-md hover:bg-emerald-400 hover:text-white hover:border-emerald-400 shadow-[4px_4px_2px_0px_rgba(0,0,0,0.75)]">Edit</button>
            <button onclick="deleteTask()" class="px-5 py-0.5 border border-solid rounded-md hover:bg-emerald-400 hover:text-white hover:border-emerald-400 shadow-[4px_4px_2px_0px_rgba(0,0,0,0.75)]">Del</button>
            <input type="checkbox" ${task.completed ? "checked" : ""}>

        `;

    taskContainer.append(taskDiv);
  });
};

//add task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = {
    description: taskInput.value,
  };

  fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newTask),
  })
    .then((res) => res.json())
    .then(() => {
      taskInput.value = "";
      getData();
    });
});

const deleteTask = (e) => {
  console.log(" ");
};

const editTask = () => {
  console.log("edit task");
};

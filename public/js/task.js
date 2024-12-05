const token = localStorage.getItem("authToken");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskContainer = document.getElementById("task-container");

document.addEventListener("DOMContentLoaded", getData);

function getData() {
  fetch("/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => renderTasks(data))
    .catch((err) => console.error("Error fetching tasks:", err));
}

const renderTasks = (tasks) => {
  taskContainer.innerHTML = "";

  if (tasks.length === 0) {
    taskContainer.innerHTML = `<p class="text-gray-500">No tasks available yet</p>`;
    return;
  }

  tasks.forEach((task) => {
    const taskRow = document.createElement("div");
    taskRow.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "border",
      "border-gray-300",
      "rounded-md",
      "px-4",
      "py-2",
      "shadow-sm"
    );

    taskRow.innerHTML = `
      <div class="task-content">
        <h3 class="font-medium" data-task-id="${task._id}">${
      task.description
    }</h3>
        <p class="text-sm text-gray-500">${new Date(
          task.createdAt
        ).toLocaleString()}</p>
      </div>
      <div class="flex items-center space-x-2"> 
        <button 
          class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
           onclick="editTask('${task._id}')">
          Edit
        </button>
        <button 
          class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          onclick="deleteTask('${task._id}')">
          Delete
        </button>
        <input 
          type="checkbox" 
          ${task.completed ? "checked" : ""}
          onchange="toggleTaskCompletion('${task._id}', this.checked)" />
      </div>
    `;

    taskContainer.append(taskRow);
  });
};

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
    })
    .catch((err) => console.error("Error adding task:", err));
});

const deleteTask = (taskId) => {
  fetch(`/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        getData();
      } else {
        throw new Error("Failed to delete task");
      }
    })
    .catch((err) => console.error("Error deleting task:", err));
};

const editTask = (taskId) => {
  const taskContent = document.querySelector(`[data-task-id="${taskId}"]`);
  const currentDescription = taskContent.textContent;

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = currentDescription;
  inputField.classList.add(
    "px-3",
    "py-1",
    "border",
    "border-gray-300",
    "rounded-md",
    "shadow-sm",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-emerald-400"
  );

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.classList.add(
    "ml-2",
    "px-4",
    "py-2",
    "bg-red-500",
    "text-white",
    "rounded-md"
  );

  saveButton.addEventListener("click", () => {
    const newDescription = inputField.value;

    fetch(`/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description: newDescription }),
    })
      .then((res) => res.json())
      .then(() => getData())
      .catch((err) => console.error("Error editing task:", err));
  });

  const parentDiv = taskContent.parentElement;
  parentDiv.innerHTML = "";
  parentDiv.append(inputField, saveButton);
};

const toggleTaskCompletion = (taskId, isCompleted) => {
  fetch(`/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ completed: isCompleted }),
  })
    .then((res) => res.json())
    .then(() => getData())
    .catch((err) => console.error("Error updating task completion:", err));
};

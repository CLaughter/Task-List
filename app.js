// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear all task events
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

// Get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node
    li.appendChild(document.createTextNode(task));
    // Create new link
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item";
    // Add icon html
    link.innerHTML = "<i class='fa fa-remove'></i>";
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node
  li.appendChild(document.createTextNode(taskInput.value + " "));
  // Create new link
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item";
  // Add icon html
  link.innerHTML = "<i class='fa fa-remove'></i>";
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  // Store in local storage
  storeTaskLs(taskInput.value + " ");
  // Clear input
  taskInput.value = "";
  e.preventDefault();
}

// Store task
function storeTaskLs(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove task from local storage
      removeTaskFromLs(e.target.parentElement.parentElement);
    }
  }
}

// Remove from local storage
function removeTaskFromLs(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
// Avoiding the use of innerHTML when emptying DOM elements (or anything else) can increase performance greatly.
// https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
function clearTasks(e) {
  if (confirm("Are You Double Sure?")) {
    // https://jsperf.com/innerhtml-vs-removechild/37
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // Clear all tasks from local storage
    clearTaskFromLS();
  }
}

// Clear all tasks from local storage
function clearTaskFromLS() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

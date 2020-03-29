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
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear all task events
  clearBtn.addEventListener("click", clearTasks);
}

// Add task
function addTask(e) {
  if (taskInput === "") {
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
  // Clear input
  taskInput.value = "";
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
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
  }
}

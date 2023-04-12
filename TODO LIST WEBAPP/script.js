// Get references to HTML elements
const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

// Initialize tasks array
let tasks = [];

// Add event listener to "Add" button
function addTask() {
  // Get task name from input
  const taskName = taskInput.value.trim();

  // Check if task name is not empty
  if (taskName !== "") {
    // Create new task object
    const newTask = {
      name: taskName,
      completed: false,
      priority: 0 // Initialize priority to 0
    };

    // Add new task to tasks array
    tasks.push(newTask);

    // Update task list
    updateTaskList();

    // Reset task input
    taskInput.value = "";
  }
}

// Update task list
function updateTaskList() {
  // Clear task list HTML
  taskList.innerHTML = "";

  // Filter tasks based on selected filter
  const filteredTasks = filterTasks(tasks, filter.value);

  // Sort tasks by priority (higher priority first)
  filteredTasks.sort((a, b) => b.priority - a.priority);

  // Loop through filtered tasks and add to task list HTML
  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="checkbox-wrapper">
        <input type="checkbox" onchange="toggleCompleted(${index})" ${
      task.completed ? "checked" : ""
    } />
        <span>${task.name}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      <select class="priority-select" onchange="changePriority(${index}, this.value)">
        <option value="0" ${task.priority === 0 ? "selected" : ""}>Priority</option>
        <option value="1" ${task.priority === 1 ? "selected" : ""}>Low</option>
        <option value="2" ${task.priority === 2 ? "selected" : ""}>Medium</option>
        <option value="3" ${task.priority === 3 ? "selected" : ""}>High</option>
      </select>
    `;
    li.classList.add("task");
    if (task.completed) {
      li.classList.add("completed");
    }
    taskList.appendChild(li);
  });
}

// Filter tasks based on selected filter
function filterTasks(tasks, filter) {
  switch (filter) {
    case "completed":
      return tasks.filter(task => task.completed);
    case "uncompleted":
      return tasks.filter(task => !task.completed);
    default:
      return tasks;
  }
}

// Toggle completed status of task
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
}

// Delete task from tasks array
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
}

// Change priority of task
function changePriority(index, priority) {
  tasks[index].priority = parseInt(priority);
  updateTaskList();
}

// Add event listener to filter dropdown
filter.addEventListener("change", () => {
  updateTaskList();
});

// Update task list on page load
updateTaskList();

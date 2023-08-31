document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Populate task list on page load
    function populateTaskList() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add task
    addTaskBtn.addEventListener("click", () => {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            populateTaskList();
            saveTasks();
            taskInput.value = "";
        }
    });

    // Delete task
    taskList.addEventListener("click", (event) => {
        if (event.target.classList.contains("deleteBtn")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            tasks.splice(index, 1);
            populateTaskList();
            saveTasks();
        }
    });

    // Populate initial task list
    populateTaskList();
});

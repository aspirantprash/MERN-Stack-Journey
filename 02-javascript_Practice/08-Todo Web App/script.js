//Full code

/* 1. Show today's date */

const date = document.querySelector("#current-date");

const now = new Date();
const getDate = now.getDate();
const month = now.toLocaleString("en-US", { month: "long" });
const year = now.getFullYear();

date.textContent = `${getDate} ${month} ${year}`;


/* 2. Select all task checkboxes */

const checkBoxes = document.querySelectorAll(".task-checkbox");


/* 3. Select progress elements */

const count = document.querySelector("#completed-count");
const percent = document.querySelector("#progress-percent");
const progressFill = document.querySelector("#progress-fill");


/* 4. Update count and progress */

function updateProgress() {
    const completedTasks = document.querySelectorAll(
        ".task-checkbox:checked"
    );

    const totalTasks = checkBoxes.length;

    count.textContent = `${completedTasks.length}/${totalTasks}`;

    const percentage = totalTasks === 0
        ? 0
        : Math.round((completedTasks.length / totalTasks) * 100);

    percent.textContent = `${percentage}%`;
    progressFill.style.width = `${percentage}%`;
}


/* 5. Handle checkbox changes */

checkBoxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {

        checkbox.closest(".task-item").classList.toggle(
            "completed",
            checkbox.checked
        );

        updateProgress();
    });
});


/* 6. Set initial progress */

updateProgress();




const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-btn");
const taskList = document.querySelector(".task-list");

addButton.addEventListener("click", function () {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("article");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <div class="task-info">
            <label class="task-title">${taskName}</label>
            <span class="task-category category-coding">New Task</span>
        </div>
    `;

    taskList.appendChild(taskItem);

    const checkbox = taskItem.querySelector(".task-checkbox");

    checkbox.addEventListener("change", function () {
        taskItem.classList.toggle("completed", checkbox.checked);
        updateProgress();
    });

    taskInput.value = "";
    updateProgress();
});


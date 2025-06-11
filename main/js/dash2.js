// =========================
// Dashboard Task Manager JS
// =========================

// Cache DOM elements for reuse
const selectAllCheckbox = document.getElementById("select-all");
const clearBtn = document.getElementById("clear");
const refreshBtn = document.getElementById("refresh");
const addTaskBtn = document.getElementById("add-task-btn");
const deleteBtn = document.getElementById("delete");
const addTaskConfirmBtn = document.getElementById("add-task");
const updateTaskConfirmBtn = document.getElementById("update-task");
const showResponse = document.getElementById("show-response");
const showResponseMessage = document.getElementById("show-response-message");

// Variables for tracking selected task
let undoStack = [];
let taskname = "";
let owner = "";

// -----------------------------------
// Helper Functions
// -----------------------------------

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}–${month}–${year}`;
}

function formatDateForInput(dateString) {
  if (!dateString) return "";
  const sep = dateString.includes("–") ? "–" : "/";
  const parts = dateString.split(sep).map(p => p.trim());
  if (parts.length !== 3) return dateString;

  let [day, month, year] = parts;
  if (Number(month) > 12) [day, month] = [month, day]; // fallback swap if month/day confused
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function clearAddInputs() {
  ["task", "entry-date", "start-date", "end-date", "description", "owner"].forEach(id => {
    document.getElementById(id).value = "";
  });
}

function showTemporaryMessage(message, duration = 3000) {
  showResponseMessage.textContent = message;
  showResponse.style.display = "flex";
  setTimeout(() => {
    showResponse.style.display = "none";
  }, duration);
}

function confirmAction(message, onConfirm) {
  const modal = document.getElementById("confirmModal");
  const text = document.getElementById("confirmText");
  const yesBtn = document.getElementById("confirmYes");
  const noBtn = document.getElementById("confirmNo");

  text.textContent = message;
  modal.style.display = "flex";

  const cleanup = () => {
    modal.style.display = "none";
    yesBtn.onclick = null;
    noBtn.onclick = null;
  };

  yesBtn.onclick = () => {
    onConfirm();
    cleanup();
  };
  noBtn.onclick = cleanup;
}

function toggleAddUpdateModal(show = true) {
  const modal = document.getElementById("AddUpdate");
  modal.style.display = show ? "flex" : "none";
}

function closeModals() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.style.display = "none";
  });
}

// -----------------------------------
// Event Listeners Setup
// -----------------------------------

// Select all checkboxes when master checkbox changes
selectAllCheckbox.addEventListener("change", () => {
  document.querySelectorAll(".task-checkbox").forEach(cb => {
    cb.checked = selectAllCheckbox.checked;
  });
});

// Close modal buttons
document.querySelectorAll(".close").forEach(el => {
  el.addEventListener("click", () => {
    el.closest(".modal").style.display = "none";
  });
});

// Close modal when clicking outside modal content
window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// Close modal on Escape key press
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModals();
});

// Clear all checked tasks
clearBtn.addEventListener("click", () => {
  // Check all checkboxes and reset styles
  document.querySelectorAll(".task-checkbox").forEach(cb => {
    cb.checked = true;
    cb.parentElement.style.textDecoration = "none";
  });

  confirmAction("Are you sure you want to clear all tasks?", () => {
    const selectedIndices = [...document.querySelectorAll(".task-checkbox:checked")]
      .map(cb => parseInt(cb.dataset.index));

    undoStack.push(JSON.parse(JSON.stringify(tasks)));
    // Remove selected tasks from tasks array (iterate backwards to avoid index issues)
    for (let i = selectedIndices.length - 1; i >= 0; i--) {
      tasks.splice(selectedIndices[i], 1);
    }
    saveTasks();
    location.reload();
  });
});

// Refresh dashboard
refreshBtn.addEventListener("click", () => {
  confirmAction("Are you sure you want to refresh the dashboard?", () => {
    location.reload();
  });
});

// Show Add Task modal
addTaskBtn.addEventListener("click", () => {
  toggleAddUpdateModal(true);
});

// Add new task
addTaskConfirmBtn.addEventListener("click", event => {
  event.preventDefault();

  const newTask = {
    task: document.getElementById("task").value.toUpperCase(),
    entry: document.getElementById("entry-date").value
      ? formatDate(document.getElementById("entry-date").value)
      : new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
    start: document.getElementById("start-date").value
      ? formatDate(document.getElementById("start-date").value)
      : new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
    end: document.getElementById("end-date").value
      ? formatDate(document.getElementById("end-date").value)
      : new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
    desc: document.getElementById("description").value.toUpperCase(),
    owner: document.getElementById("owner").value.toUpperCase(),
    type: document.getElementById("type").value.toUpperCase(),
    status: document.getElementById("status").value.toUpperCase(),
  };

  if (!newTask.task || !newTask.owner) {
    alert("Task name and owner are required.");
    return;
  }

  tasks.unshift(newTask);
  saveTasks();
  clearAddInputs();
  toggleAddUpdateModal(false);
  showTemporaryMessage("Task Added Successfully!");
  location.reload();
});

// Update existing task
updateTaskConfirmBtn.addEventListener("click", event => {
  event.preventDefault();

  if (!taskname || !owner) {
    alert("No task selected for update.");
    return;
  }

  let allTasks = JSON.parse(localStorage.getItem("tasks"));
  let taskToUpdate = allTasks.find(t => t.task === taskname && t.owner === owner);

  if (taskToUpdate) {
    taskToUpdate.task = document.getElementById("task").value.toUpperCase();
    taskToUpdate.entry = document.getElementById("entry-date").value
      ? formatDate(document.getElementById("entry-date").value)
      : new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    taskToUpdate.start = document.getElementById("start-date").value
      ? formatDate(document.getElementById("start-date").value)
      : new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    taskToUpdate.end = document.getElementById("end-date").value
      ? formatDate(document.getElementById("end-date").value)
      : new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    taskToUpdate.desc = document.getElementById("description").value.toUpperCase();
    taskToUpdate.type = document.getElementById("type").value.toUpperCase();
    taskToUpdate.owner = document.getElementById("owner").value.toUpperCase();
    taskToUpdate.status = document.getElementById("status").value.toUpperCase();

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    clearAddInputs();
    toggleAddUpdateModal(false);
    showTemporaryMessage("Task Updated Successfully!");
    location.reload();
  } else {
    showTemporaryMessage("Task Not Found!");
  }
});

// Delete selected tasks
deleteBtn.addEventListener("click", () => {
  const selectedIndices = [...document.querySelectorAll(".task-checkbox:checked")]
    .map(cb => parseInt(cb.dataset.index));

  if (selectedIndices.length === 0) {
    alert("No tasks selected.");
    return;
  }

  confirmAction(`Delete ${selectedIndices.length} task(s)?`, () => {
    undoStack.push(JSON.parse(JSON.stringify(tasks)));
    for (let i = selectedIndices.length - 1; i >= 0; i--) {
      tasks.splice(selectedIndices[i], 1);
    }
    saveTasks();
    location.reload();
  });
});

// Handle task row click to populate modal with task details
document.querySelectorAll(".task-row").forEach(row => {
  row.addEventListener("click", () => {
    // Extract and populate task details into modal inputs
    document.getElementById("task").value = row.querySelector(".task").innerText;
    document.getElementById("entry-date").value = formatDateForInput(row.querySelector(".entry-date").innerText);
    document.getElementById("start-date").value = formatDateForInput(row.querySelector(".start-date").innerText);
    document.getElementById("end-date").value = formatDateForInput(row.querySelector(".end-date").innerText);
    document.getElementById("description").value = row.querySelector(".desc").innerText;
    document.getElementById("owner").value = row.querySelector(".owner").innerText;
    document.getElementById("type").value = row.querySelector(".type").innerText.toLowerCase();

    const statusText = row.querySelector(".status").innerText.toLowerCase();
    document.getElementById("status").value = statusText === "incomplete" ? "incompleted" : "completed";

    taskname = document.getElementById("task").value;
    owner = document.getElementById("owner").value;

    toggleAddUpdateModal(true);
  });
});

// Navigation buttons
const navActions = {
  "task-management": () => location.href = "../html/dash.html",
  "dashboard": () => location.href = "../html/dash2.html",
  "statistic": () => showWorkingContainer(),
  "info": () => showWorkingContainer(),
  "setting": () => showWorkingContainer(),
  "logout": () => {
    localStorage.removeItem("isLoggedIn");
    location.href = "../html/login.html";
  }
};

function showWorkingContainer() {
  const container = document.getElementById("working-Container");
  container.style.display = "flex";
  setTimeout(() => (container.style.display = "none"), 3000);
}

Object.entries(navActions).forEach(([id, fn]) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", e => {
    e.preventDefault();
    fn();
  });
});

// Social share buttons feedback
document.querySelectorAll(".share-socail").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    showTemporaryMessage("Link Copied");
  });
});

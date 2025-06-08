let undoStack = [];
let redoStack = [];

function showStatus(msg, timeout = 2000) {
  const status = document.getElementById("statusMessage");
  status.textContent = msg;
  setTimeout(() => (status.textContent = ""), timeout);
}

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let sortKey = null;
let ascending = true;

function renderTable(data) {
  const tbody = document.getElementById("taskBody");
  tbody.innerHTML = "";
  tbody.classList.add("flash");
  setTimeout(() => tbody.classList.remove("flash"), 300);

  data.forEach((task, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="checkbox" class="row-check" data-index="${index}" /></td>
      <td>${task.task}</td>
      <td>${task.entry}</td>
      <td>${task.start}</td>
      <td>${task.end}</td>
      <td>${task.desc}</td>
      <td>${task.owner}</td>
      <td>${task.type}</td>
      <td>${task.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

function filterTasks() {
  const search = document.getElementById("search").value.toLowerCase();
  return tasks.filter(task => 
    task.task.toLowerCase().includes(search) ||
    task.owner.toLowerCase().includes(search
  ));
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("search").addEventListener("input", () => {
  renderTable(filterTasks());
});

document.getElementById("add-btn").addEventListener("click", () => {
  const task = {
    task: document.getElementById("new-task").value,
    entry: document.getElementById("new-entry").value,
    start: document.getElementById("new-start").value,
    end: document.getElementById("new-end").value,
    desc: document.getElementById("new-desc").value,
    owner: document.getElementById("new-owner").value,
    type: document.getElementById("new-type").value,
    status: document.getElementById("new-status").value,
  };

  if (!task.task || !task.owner) {
    alert("Task name and owner are required.");
    return;
  }

  tasks.unshift(task);
  save();
  renderTable(filterTasks());
  document.getElementById("new-task").value = "";
  document.getElementById("new-owner").value = "";
});

document.getElementById("bulkDeleteBtn").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".row-check:checked")].map(cb => parseInt(cb.dataset.index));
  if (!selected.length) return showStatus("No rows selected ❗");

  selected.forEach(index => tasks.splice(index, 1));
  save();
  renderTable(filterTasks());
  showStatus("Deleted selected tasks 🗑️");
});

document.getElementById("bulkCompleteBtn").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".row-check:checked")].map(cb => parseInt(cb.dataset.index));
  if (!selected.length) return showStatus("No rows selected ❗");

  selected.forEach(index => tasks[index].status = "COMPLETE");
  save();
  renderTable(filterTasks());
  showStatus("Marked selected tasks as complete ✅");
});

renderTable(tasks);
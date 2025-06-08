// filepath: d:\todo list\main\js\dash2.js
let undoStack = [];
let redoStack = [];

function showStatus(msg, timeout = 2000) {
  const status = document.getElementById("statusMessage");
  status.textContent = msg;
  setTimeout(() => (status.textContent = ""), timeout);
}

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTable(data) {
  const tbody = document.getElementById("taskBody");
  tbody.innerHTML = "";
  tbody.classList.add("flash");
  setTimeout(() => tbody.classList.remove("flash"), 300);

  data.forEach((task, index) => {
    const tr = document.createElement("tr");
    tr.className = "task-row";
    tr.innerHTML = `
      <td><input type="checkbox" class="task-checkbox" data-index="${index}" /></td>
      <td>${task.task}</td>
      <td>${task.entry}</td>
      <td>${task.start}</td>
      <td>${task.end}</td>
      <td>${task.desc}</td>
      <td>${task.owner}</td>
      <td>${task.type}</td>
      <td>${task.status}</td>
      <td><button class="close" data-index="${index}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("add-task-btn").addEventListener("click", () => {
  const task = {
    task: document.getElementById("task").value,
    entry: document.getElementById("entry-date").value,
    start: document.getElementById("start-date").value,
    end: document.getElementById("end-date").value,
    desc: document.getElementById("description").value,
    owner: document.getElementById("owner").value,
    type: document.getElementById("type").value,
    status: document.getElementById("status").value,
  };

  if (!task.task || !task.owner) {
    alert("Task name and owner are required.");
    return;
  }

  tasks.unshift(task);
  save();
  renderTable(tasks);
});

document.getElementById("delete").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".task-checkbox:checked")].map(
    (cb) => parseInt(cb.dataset.index)
  );

  if (!selected.length) {
    alert("No tasks selected for deletion.");
    return;
  }

  confirmAction(`Delete ${selected.length} task(s)?`, () => {
    selected.forEach((index) => tasks.splice(index, 1));
    save();
    renderTable(tasks);
  });
});

document.querySelectorAll(".close").forEach((el) => {
  el.addEventListener("click", () => {
    const index = parseInt(el.dataset.index);
    tasks.splice(index, 1);
    save();
    renderTable(tasks);
  });
});

renderTable(tasks);
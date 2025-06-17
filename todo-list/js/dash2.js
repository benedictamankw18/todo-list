let undoStack = [];
let redoStack = [];

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showStatus(msg, timeout = 2000) {
  const status = document.getElementById("statusMessage");
  if (status) {
    status.textContent = msg;
    setTimeout(() => (status.textContent = ""), timeout);
  }
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

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

function confirmAction(message, callback) {
  const modal = document.getElementById("confirmModal");
  const confirmText = document.getElementById("confirmText");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

  confirmText.textContent = message;
  modal.style.display = "block";

  confirmYes.onclick = () => {
    modal.style.display = "none";
    callback();
  };

  confirmNo.onclick = () => {
    modal.style.display = "none";
  };
}

// Add Task Button functionality
document.getElementById("add-task-btn").addEventListener("click", () => {
  const task = {
    task: document.getElementById("task").value.trim(),
    entry: document.getElementById("entry-date").value,
    start: document.getElementById("start-date").value,
    end: document.getElementById("end-date").value,
    desc: document.getElementById("description").value.trim(),
    owner: document.getElementById("owner").value.trim(),
    type: document.getElementById("type").value.trim(),
    status: document.getElementById("status").value.trim(),
  };

  if (!task.task || !task.owner) {
    alert("Task name and owner are required.");
    return;
  }

  tasks.unshift(task);
  save();
  renderTable(tasks);
});

// Delete selected tasks
document.getElementById("delete").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".task-checkbox:checked")].map(
    (cb) => parseInt(cb.dataset.index)
  );

  if (!selected.length) {
    alert("No tasks selected for deletion.");
    return;
  }

  confirmAction(`Delete ${selected.length} task(s)?`, () => {
    selected.sort((a, b) => b - a).forEach((index) => tasks.splice(index, 1));
    save();
    renderTable(tasks);
  });
});

// Delete individual tasks using event delegation
document.getElementById("taskBody").addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    const index = parseInt(e.target.dataset.index);
    confirmAction(`Are you sure you want to delete this task?`, () => {
      tasks.splice(index, 1);
      save();
      renderTable(tasks);
    });
  }
});

// Initial render
renderTable(tasks);

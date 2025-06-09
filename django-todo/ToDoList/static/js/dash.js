let undoStack = [];
let redoStack = [];
let tasks = [];

// Fetch tasks from the backend
async function fetchTasks() {
  const res = await fetch("/api/tasks/");
  tasks = await res.json();
  populateOwnerFilter();
  renderTable(filterTasks());
}

// Save (add or update) a task to the backend
async function saveTask(task, method = "POST", id = null) {
  const url = id ? `/api/tasks/${id}/` : "/api/tasks/";
  await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify(task),
  });
  // Do not call fetchTasks() here!
}

// Delete a task from the backend
async function deleteTask(id) {
  pushUndo();
  redoStack.length = 0;
  await fetch(`/api/tasks/${id}/`, {
    method: "DELETE",
    headers: {
      "X-CSRFToken": getCSRFToken(),
    },
  });
  fetchTasks();
}

// Utility to get CSRF token from cookie
function getCSRFToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];
}

// Add Task button handler
document
  .querySelector(".add-task-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    pushUndo();
    redoStack.length = 0; // Clear redo stack
    const form = e.target;
    const task = {
      task: form.task.value.toUpperCase(),
      entry: form.entry.value,
      start: form.start.value,
      end: form.end.value,
      desc: form.desc.value.toUpperCase(),
      owner: form.owner.value.toUpperCase(),
      type: form.type.value.toUpperCase(),
      status: form.status.value.toUpperCase(),
    };
    await saveTask(task, "POST");
    form.reset();
    showStatus("Task added ✅");
    fetchTasks(); // Only one refresh here
  });

function filterTasks() {
  const search = document.getElementById("search")?.value?.toLowerCase() || "";
  const status = document.getElementById("filter-status")?.value || "";
  const owner = document.getElementById("filter-owner")?.value || "";

  return tasks.filter((task) => {
    const matchesSearch =
      task.task.toLowerCase().includes(search) ||
      task.desc.toLowerCase().includes(search) ||
      task.owner.toLowerCase().includes(search);
    const matchesStatus = !status || task.status === status;
    const matchesOwner = !owner || task.owner === owner;
    return matchesSearch && matchesStatus && matchesOwner;
  });
}

// Render table and wire up edit/delete
function renderTable(data) {
  const tbody = document.getElementById("taskBody");
  tbody.innerHTML = "";
  data.forEach((task) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.task}</td>
      <td>${task.entry}</td>
      <td>${task.start}</td>
      <td>${task.end}</td>
      <td>${task.desc}</td>
      <td>${task.owner}</td>
      <td>${task.type}</td>
      <td>${task.status}</td>
      <td>
        <button class="edit-btn" data-id="${task.id}">✏️</button>
        <button class="delete-btn" data-id="${task.id}">🗑️</button>
      </td>
    `;

    // Delete logic
    tr.querySelector(".delete-btn").onclick = async () => {
      await deleteTask(task.id);
      showStatus("Task deleted 🗑️");
    };

    // Edit logic
    tr.querySelector(".edit-btn").onclick = () => {
      // Replace cells with input fields
      tr.innerHTML = `
        <td><input type="text" value="${task.task}" /></td>
        <td><input type="date" value="${task.entry}" /></td>
        <td><input type="date" value="${task.start}" /></td>
        <td><input type="date" value="${task.end}" /></td>
        <td><input type="text" value="${task.desc}" /></td>
        <td><input type="text" value="${task.owner}" /></td>
        <td>
          <select>
            <option value="PRIVATE" ${
              task.type === "PRIVATE" ? "selected" : ""
            }>PRIVATE</option>
            <option value="PUBLIC" ${
              task.type === "PUBLIC" ? "selected" : ""
            }>PUBLIC</option>
            <option value="PERSONAL" ${
              task.type === "PERSONAL" ? "selected" : ""
            }>PERSONAL</option>
          </select>
        </td>
        <td>
          <select>
            <option value="INCOMPLETE" ${
              task.status === "INCOMPLETE" ? "selected" : ""
            }>INCOMPLETE</option>
            <option value="COMPLETE" ${
              task.status === "COMPLETE" ? "selected" : ""
            }>COMPLETE</option>
          </select>
        </td>
        <td>
          <button class="save-btn">💾</button>
          <button class="cancel-btn">✖️</button>
        </td>
      `;

      // Save logic
      tr.querySelector(".save-btn").onclick = async () => {
        const inputs = tr.querySelectorAll("input, select");
        const updatedTask = {
          task: inputs[0].value.toUpperCase(),
          entry: inputs[1].value,
          start: inputs[2].value,
          end: inputs[3].value,
          desc: inputs[4].value.toUpperCase(),
          owner: inputs[5].value.toUpperCase(),
          type: inputs[6].value.toUpperCase(),
          status: inputs[7].value.toUpperCase(),
        };
        pushUndo();
        redoStack.length = 0;
        await saveTask(updatedTask, "PUT", task.id);
        showStatus("Task updated 💾");
        fetchTasks();
      };

      // Cancel logic
      tr.querySelector(".cancel-btn").onclick = () => {
        fetchTasks();
      };
    };

    tbody.appendChild(tr);
  });
}

// Populate owner filter options
function populateOwnerFilter() {
  const ownerSelect = document.getElementById("filter-owner");
  // Get unique owners from tasks
  const owners = Array.from(new Set(tasks.map((t) => t.owner).filter(Boolean)));
  // Save current selection
  const current = ownerSelect.value;
  // Clear and add default option
  ownerSelect.innerHTML = `<option value="">All Owners</option>`;
  owners.forEach((owner) => {
    const opt = document.createElement("option");
    opt.value = owner;
    opt.textContent = owner;
    ownerSelect.appendChild(opt);
  });
  // Restore selection if possible
  if (owners.includes(current)) ownerSelect.value = current;
}

// Initial load
fetchTasks();

// Optional: showStatus utility for user feedback
function showStatus(msg) {
  let el = document.getElementById("statusMessage");
  if (!el) {
    el = document.createElement("div");
    el.id = "statusMessage";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = 1;
  setTimeout(() => {
    el.style.opacity = 0;
  }, 2000);
}

// --- Add these functions ---

// Push current state to undo stack
function pushUndo() {
  undoStack.push(JSON.stringify(tasks));
  if (undoStack.length > 50) undoStack.shift();
}

// Undo: restore previous state
async function undo() {
  if (undoStack.length === 0) return showStatus("Nothing to undo");
  redoStack.push(JSON.stringify(tasks));
  const prev = undoStack.pop();
  await restoreTasksFromState(prev);
  showStatus("Undo");
}

// Redo: restore next state
async function redo() {
  if (redoStack.length === 0) return showStatus("Nothing to redo");
  undoStack.push(JSON.stringify(tasks));
  const next = redoStack.pop();
  await restoreTasksFromState(next);
  showStatus("Redo");
}

// Restore tasks from a serialized state (array of tasks)
async function restoreTasksFromState(state) {
  const arr = JSON.parse(state);
  // Remove all tasks in DB
  const current = [...tasks];
  for (const t of current) {
    await fetch(`/api/tasks/${t.id}/`, {
      method: "DELETE",
      headers: { "X-CSRFToken": getCSRFToken() },
    });
  }
  // Add all tasks from state
  for (const t of arr) {
    const { id, ...taskData } = t;
    await saveTask(taskData, "POST");
  }
  await fetchTasks();
}

// --- Hook up buttons ---
document.getElementById("undo-btn").onclick = undo;
document.getElementById("redo-btn").onclick = redo;

// New export button functionality
document.getElementById("exportBtn").onclick = () => {
  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Import button functionality
document.getElementById("importFile").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const text = await file.text();
  let imported;
  try {
    imported = JSON.parse(text);
    if (!Array.isArray(imported)) throw new Error();
  } catch {
    showStatus("Invalid JSON file!");
    return;
  }
  // Append imported tasks (do NOT delete existing)
  for (const t of imported) {
    const { id, ...taskData } = t;
    await saveTask(taskData, "POST");
  }
  fetchTasks();
  showStatus("Tasks imported and appended ✅");
  e.target.value = ""; // Reset file input
});

// Listen for search and filter changes
document.getElementById("search").addEventListener("input", () => {
  renderTable(filterTasks());
});
document.getElementById("filter-status").addEventListener("change", () => {
  renderTable(filterTasks());
});
document.getElementById("filter-owner").addEventListener("change", () => {
  renderTable(filterTasks());
});

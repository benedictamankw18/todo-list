let undoStack = [];
let redoStack = [];

function showStatus(msg, timeout = 2000) {
  const status = document.getElementById("statusMessage");
  status.textContent = msg;
  setTimeout(() => (status.textContent = ""), timeout);
}

const tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "DESCRIPTION HERE IT GOES LONG TEXT",
    owner: "JASSICA",
    type: "PRIVATE",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "COMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "DESCRIPTION HERE IT GOES LONG TEXT",
    owner: "JASSICA",
    type: "PRIVATE",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "COMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "DESCRIPTION HERE IT GOES LONG TEXT",
    owner: "JASSICA",
    type: "PRIVATE",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "COMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "DESCRIPTION HERE IT GOES LONG TEXT",
    owner: "JASSICA",
    type: "PRIVATE",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "COMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "DESCRIPTION HERE IT GOES LONG TEXT",
    owner: "JASSICA",
    type: "PRIVATE",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "COMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "DESCRIPTION HERE IT GOES LONG TEXT",
    owner: "JASSICA",
    type: "PRIVATE",
    status: "INCOMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "COMPLETE",
  },
  {
    task: "DATABASE (MYSQL)",
    entry: "23–01–2023",
    start: "12–03–2023",
    end: "23–05–2023",
    desc: "Sync with frontend",
    owner: "MYSELF",
    type: "PUBLIC",
    status: "INCOMPLETE",
  },
  // Add more as needed
];

let sortKey = null;
let ascending = true;

function renderTable(data) {
  const tbody = document.getElementById("taskBody");
  tbody.innerHTML = "";
  tbody.classList.add("flash");
  setTimeout(() => tbody.classList.remove("flash"), 300);

  const uniqueOwners = [...new Set(data.map((t) => t.owner))];
  const ownerFilter = document.getElementById("filter-owner");
  ownerFilter.innerHTML = `<option value="">All Owners</option>`;
  uniqueOwners.forEach((owner) => {
    const opt = document.createElement("option");
    opt.value = owner;
    opt.textContent = owner;
    ownerFilter.appendChild(opt);
  });

  data.forEach((task, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><input type="checkbox" ${
        task.status === "COMPLETE" ? "checked" : ""
      } class="row-check"></td>
      <td><input value="${task.task}" disabled /></td>
      <td><input value="${task.entry}" disabled /></td>
      <td><input value="${task.start}" disabled /></td>
      <td><input value="${task.end}" disabled /></td>
      <td><input value="${task.desc}" disabled /></td>
      <td><input value="${task.owner}" disabled /></td>
      <td><input value="${task.type}" disabled /></td>
      <td>${task.status}</td>
      <td>
        <button class="edit-btn">✏️</button>
        <button class="update-btn" style="display:none;">✅</button>
        <button class="cancel-btn" style="display:none;">❌</button>
        <button class="delete-btn">🗑️</button>
      </td>
    `;

    const inputs = tr.querySelectorAll("input");
    const editBtn = tr.querySelector(".edit-btn");
    const updateBtn = tr.querySelector(".update-btn");
    const cancelBtn = tr.querySelector(".cancel-btn");
    const deleteBtn = tr.querySelector(".delete-btn");
    const checkbox = tr.querySelector("input[type=checkbox]");
    let originalValues = [];

    checkbox.addEventListener("change", () => {
      undoStack.push(JSON.parse(JSON.stringify(tasks)));
      redoStack = [];
      task.status = checkbox.checked ? "COMPLETE" : "INCOMPLETE";
      save();
      renderTable(filterTasks());
    });

    editBtn.addEventListener("click", () => {
      originalValues = Array.from(inputs).map((input) => input.value);
      inputs.forEach((input, i) => {
        if (i !== 0) input.disabled = false;
      });
      tr.classList.add("editing");
      editBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      cancelBtn.style.display = "inline-block";
    });

    updateBtn.addEventListener("click", () => {
      if (
        !validateDates(inputs[2].value) ||
        !validateDates(inputs[3].value) ||
        !validateDates(inputs[4].value)
      ) {
        alert("❗ Dates must be in dd–mm–yyyy format");
        return;
      }

      undoStack.push(JSON.parse(JSON.stringify(tasks)));
      redoStack = [];

      Object.assign(task, {
        task: inputs[1].value,
        entry: inputs[2].value,
        start: inputs[3].value,
        end: inputs[4].value,
        desc: inputs[5].value,
        owner: inputs[6].value,
        type: inputs[7].value,
      });

      inputs.forEach((input, i) => {
        if (i !== 0) input.disabled = true;
      });
      tr.classList.remove("editing");
      editBtn.style.display = "inline-block";
      updateBtn.style.display = "none";
      cancelBtn.style.display = "none";
      save();
      renderTable(filterTasks());
      showStatus("Task updated ✅");
    });

    cancelBtn.addEventListener("click", () => {
      inputs.forEach((input, i) => {
        input.value = originalValues[i];
        input.disabled = true;
      });
      tr.classList.remove("editing");
      editBtn.style.display = "inline-block";
      updateBtn.style.display = "none";
      cancelBtn.style.display = "none";
      showStatus("Edit canceled ❌");
    });

    deleteBtn.addEventListener("click", () => {
      confirmAction("Delete this task?", () => {
        undoStack.push(JSON.parse(JSON.stringify(tasks)));
        redoStack = [];
        tasks.splice(index, 1);
        save();
        renderTable(filterTasks());
        showStatus("Task deleted 🗑️");
      });

      undoStack.push(JSON.parse(JSON.stringify(tasks)));
      redoStack = [];
      tasks.splice(index, 1);
      save();
      renderTable(filterTasks());
      showStatus("Task deleted 🗑️");
    });

    tbody.appendChild(tr);
  });
}

function validateDates(dateStr) {
  return /^\d{2}–\d{2}–\d{4}$/.test(dateStr);
}

function filterTasks() {
  const search = document.getElementById("search").value.toLowerCase();
  const status = document.getElementById("filter-status").value;
  const owner = document.getElementById("filter-owner").value;

  return tasks.filter(
    (t) =>
      (!status || t.status === status) &&
      (!owner || t.owner === owner) &&
      Object.values(t).some((val) => val.toLowerCase().includes(search))
  );
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("search").addEventListener("input", () => {
  renderTable(filterTasks());
});

document.getElementById("filter-status").addEventListener("change", () => {
  renderTable(filterTasks());
});

document.getElementById("filter-owner").addEventListener("change", () => {
  renderTable(filterTasks());
});

document.querySelectorAll("th[data-sort]").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;
    if (sortKey === key) {
      ascending = !ascending;
    } else {
      sortKey = key;
      ascending = true;
    }
    tasks.sort((a, b) => {
      if (a[key] < b[key]) return ascending ? -1 : 1;
      if (a[key] > b[key]) return ascending ? 1 : -1;
      return 0;
    });
    renderTable(filterTasks());
  });
});

renderTable(tasks);

new Sortable(document.getElementById("taskBody"), {
  animation: 150,
  onEnd: function (evt) {
    const [movedTask] = tasks.splice(evt.oldIndex, 1);
    tasks.splice(evt.newIndex, 0, movedTask);
    save();
    renderTable(filterTasks());
  },
});

document.getElementById("add-btn").addEventListener("click", () => {
  const task = {
    task: document.getElementById("new-task").value,
    entry: formatDate(document.getElementById("new-entry").value),
    start: formatDate(document.getElementById("new-start").value),
    end: formatDate(document.getElementById("new-end").value),
    desc: document.getElementById("new-desc").value,
    owner: document.getElementById("new-owner").value,
    type: document.getElementById("new-type").value,
    status: document.getElementById("new-status").value,
  };

  if (!task.task || !task.owner) {
    alert("Task name and owner are required.");
    return;
  }

  tasks.unshift(task); // add at the top
  save();
  renderTable(filterTasks());
  clearAddInputs();
});

function clearAddInputs() {
  [
    "new-task",
    "new-entry",
    "new-start",
    "new-end",
    "new-desc",
    "new-owner",
  ].forEach((id) => (document.getElementById(id).value = ""));
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}–${m}–${y}`;
}

undoStack.push(JSON.parse(JSON.stringify(tasks))); // deep clone
redoStack = []; // clear redo

document.getElementById("undo-btn").addEventListener("click", () => {
  if (undoStack.length === 0) return showStatus("Nothing to undo ❗");

  redoStack.push(JSON.parse(JSON.stringify(tasks)));
  const previous = undoStack.pop();
  localStorage.setItem("tasks", JSON.stringify(previous));
  renderTable(filterTasks());
  showStatus("Undid last change ↩️");
});

document.getElementById("redo-btn").addEventListener("click", () => {
  if (redoStack.length === 0) return showStatus("Nothing to redo ❗");

  undoStack.push(JSON.parse(JSON.stringify(tasks)));
  const redoState = redoStack.pop();
  localStorage.setItem("tasks", JSON.stringify(redoState));
  renderTable(filterTasks());
  showStatus("Redid last change ↪️");
});

function confirmAction(message, onConfirm) {
  const modal = document.getElementById("confirmModal");
  const text = document.getElementById("confirmText");
  text.textContent = message;
  modal.style.display = "flex";

  const yes = document.getElementById("confirmYes");
  const no = document.getElementById("confirmNo");

  const cleanup = () => (modal.style.display = "none");

  yes.onclick = () => {
    onConfirm();
    cleanup();
  };
  no.onclick = cleanup;
}

document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tasks.json";
  link.click();
});

document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const importedTasks = JSON.parse(reader.result);
      if (!Array.isArray(importedTasks)) throw new Error("Invalid format");
      undoStack.push(JSON.parse(JSON.stringify(tasks)));
      redoStack = [];
      tasks.splice(0, tasks.length, ...importedTasks);
      save();
      renderTable(filterTasks());
      showStatus("Tasks imported ✅");
    } catch (err) {
      showStatus("Import failed ❌");
    }
  };
  reader.readAsText(file);
});

document.getElementById("bulkDeleteBtn").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".row-check:checked")].map(
    (cb) => parseInt(cb.dataset.index)
  );
  if (!selected.length) return showStatus("No rows selected ❗");

  confirmAction(`Delete ${selected.length} task(s)?`, () => {
    undoStack.push(JSON.parse(JSON.stringify(tasks)));
    for (let i = selected.length - 1; i >= 0; i--) {
      tasks.splice(selected[i], 1);
    }
    save();
    renderTable(filterTasks());
    showStatus("Bulk deleted 🗑️");
  });
});

document.getElementById("bulkCompleteBtn").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".row-check:checked")].map(
    (cb) => parseInt(cb.dataset.index)
  );
  if (!selected.length) return showStatus("No rows selected ❗");

  undoStack.push(JSON.parse(JSON.stringify(tasks)));
  selected.forEach((i) => (tasks[i].status = "COMPLETE"));
  save();
  renderTable(filterTasks());
  showStatus("Marked as complete ✅");
});

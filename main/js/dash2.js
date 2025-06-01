// import { save } from "./dash.js";

// Placeholder if you'd like to add interactivity later
// console.log("Dashboard loaded!");
const select_all = document.getElementById("select-all");

document.querySelectorAll(".task-checkbox").forEach((a) => {
  select_all.addEventListener("change", () => {
    a.checked = select_all.checked;
  });
});

document.querySelectorAll(".close").forEach((el) => {
  el.addEventListener("click", () => {
    el.closest(".modal").style.display = "none";
  });
});

let clearBtn = document.getElementById("clear");
let refresh = document.getElementById("refresh");
let addTaskBtn = document.getElementById("add-task-btn");
let deleteBtn = document.getElementById("delete");

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

function AddUpdateAction() {
  const AddUpdate = document.getElementById("AddUpdate");
  AddUpdate.style.display = "flex";
  const close = document.getElementById("close");

  const cleanup = () => (AddUpdate.style.display = "none");
  close.onclick = cleanup;
}

// let container_detail = document.getElementById("container-detail");
clearBtn.addEventListener("click", () => {
  document.querySelectorAll(".task-checkbox").forEach((cb) => {
    cb.checked = true;
    cb.parentElement.style.textDecoration = "none";
  });
  confirmAction("Are you sure you want to clear all tasks?", () => {
    // console.log("Dashboard clear");

    const selected = [
      ...document.querySelectorAll(".task-checkbox:checked"),
    ].map((cb) => parseInt(cb.dataset.index));
    // if (!selected.length) return showStatus("No rows selected ❗");

    undoStack.push(JSON.parse(JSON.stringify(tasks)));
    for (let i = selected.length - 1; i >= 0; i--) {
      tasks.splice(selected[i], 1);
    }
    save();
    location.reload();
  });
});

refresh.addEventListener("click", () => {
  confirmAction("Are you sure you want to refresh the dashboard?", () => {
    location.reload();
  });
});
addTaskBtn.addEventListener("click", () => {
  AddUpdateAction();
});

// Modal close functionality
document.querySelectorAll(".close").forEach((el) => {
  el.addEventListener("click", () => {
    el.closest(".modal").style.display = "none";
  });
});
// Close modal on outside click
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});
// Close modal on Escape key
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.style.display = "none";
    });
  }
});

const add_task = document.getElementById("add-task");
const update_task = document.getElementById("update-task");
const show_response = document.getElementById("show-response");

function clearAddInputs() {
  [
    "task",
    "entry-date",
    "start-date",
    "end-date",
    "description",
    "owner",
  ].forEach((id) => (document.getElementById(id).value = ""));
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}–${m}–${y}`;
}
add_task.addEventListener("click", (event) => {
  const task = {
    task: document.getElementById("task").value.toUpperCase(),
    entry: document.getElementById("entry-date").value
      ? formatDate(document.getElementById("entry-date").value)
      : new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
    start: document.getElementById("start-date").value
      ? formatDate(document.getElementById("start-date").value)
      : new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
    end: document.getElementById("end-date").value
      ? formatDate(document.getElementById("end-date").value)
      : new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
    desc: document.getElementById("description").value.toUpperCase(),
    owner: document.getElementById("owner").value.toUpperCase(),
    type: document.getElementById("type").value.toUpperCase(),
    status: document.getElementById("status").value.toUpperCase(),
  };

  if (!task.task || !task.owner) {
    alert("Task name and owner are required.");
    return;
  }

  tasks.unshift(task); // add at the top
  save();
  location.reload;
  clearAddInputs();

  const show_response_message = document.getElementById(
    "show-response-message"
  );
  show_response_message.textContent = "Task Added Successfully!";
  event.preventDefault();
  show_response.style.display = "flex";
  setTimeout(() => {
    show_response.style.display = "none";
  }, 3000);
});

update_task.addEventListener("click", (event) => {
  // console.log(taskname, owner);
  if (!taskname || !owner) {
    alert("No task selected for update.");
    return;
  }
  // Update task logic here
  event.preventDefault();
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let taskToUpdate = tasks.find(
    (task) => task.task === taskname && task.owner === owner
  );

  if (taskToUpdate) {
    taskToUpdate.task = document.getElementById("task").value.toUpperCase();
    taskToUpdate.entry = document.getElementById("entry-date").value
      ? formatDate(document.getElementById("entry-date").value)
      : new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
    taskToUpdate.start = document.getElementById("start-date").value
      ? formatDate(document.getElementById("start-date").value)
      : new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
    taskToUpdate.end = document.getElementById("end-date").value
      ? formatDate(document.getElementById("end-date").value)
      : new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
    taskToUpdate.desc = document
      .getElementById("description")
      .value.toUpperCase();
    taskToUpdate.type = document.getElementById("type").value.toUpperCase();
    taskToUpdate.owner = document.getElementById("owner").value.toUpperCase();
    taskToUpdate.status = document.getElementById("status").value.toUpperCase();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("show-response-message").textContent =
      "Task Updated Successfully!";
    document.getElementById("show-response").style.display = "flex";
    setTimeout(() => {
      document.getElementById("show-response").style.display = "none";
    }, 3000);
    clearAddInputs();
    // location.reload();
  } else {
    document.getElementById("show-response-message").textContent =
      "Task Not Found!";
    document.getElementById("show-response").style.display = "flex";
    setTimeout(() => {
      document.getElementById("show-response").style.display = "none";
    }, 3000);
  }

  // const show_response_message = document.getElementById(
  //   "show-response-message"
  // );
  // show_response_message.textContent = "Task Updated Successfully!";
  // event.preventDefault();
  // show_response.style.display = "flex";
  // setTimeout(() => {
  //   show_response.style.display = "none";
  // }, 3000);
});

const task_management = document.getElementById("task-management");
const dashboard = document.getElementById("dashboard");
const statistic = document.getElementById("statistic");
const info = document.getElementById("info");
const setting = document.getElementById("setting");
const logout = document.getElementById("logout");

statistic.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("working-Container").style.display = "flex";
  setTimeout(() => {
    document.getElementById("working-Container").style.display = "none";
  }, 3000);
});

info.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("working-Container").style.display = "flex";
  setTimeout(() => {
    document.getElementById("working-Container").style.display = "none";
  }, 3000);
});

setting.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("working-Container").style.display = "flex";
  setTimeout(() => {
    document.getElementById("working-Container").style.display = "none";
  }, 3000);
});

task_management.addEventListener("click", (event) => {
  location.href = "../html/dash.html";
});

dashboard.addEventListener("click", (event) => {
  location.href = "../html/dash2.html";
});

logout.addEventListener("click", (event) => {
  location.href = "../html/login.html";
});

document.querySelectorAll(".share-socail").forEach((shared) => {
  shared.addEventListener("click", () => {
    const show_response_message = document.getElementById(
      "show-response-message"
    );
    show_response_message.textContent = "Link Copied";
    event.preventDefault();
    show_response.style.display = "flex";
    setTimeout(() => {
      show_response.style.display = "none";
    }, 3000);
  });
});

let id_row;
let taskname;
let owner;

document.querySelectorAll(".task-row").forEach((row) => {
  row.addEventListener("click", () => {
    document.getElementById("task").value =
      row.querySelector(".task").innerHTML;

    // Format dates if necessary
    const entryDate = row.querySelector(".entry-date").innerHTML;
    const startDate = row.querySelector(".start-date").innerHTML;
    const endDate = row.querySelector(".end-date").innerHTML;

    // Assuming dates are in DD–MM–YYYY format
    // console.log(entryDate, startDate, endDate);
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const sep = dateString.includes("–") ? "–" : "/";
      const parts = dateString.split(sep).map((p) => p.trim());
      if (parts.length !== 3) return dateString;

      let [day, month, year] = parts;
      if (Number(month) > 12) [day, month] = [month, day]; // fallback swap
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    document.getElementById("entry-date").value = formatDate(entryDate);
    document.getElementById("start-date").value = formatDate(startDate);
    document.getElementById("end-date").value = formatDate(endDate);

    document.getElementById("description").value =
      row.querySelector(".desc").innerHTML;
    document.getElementById("owner").value =
      row.querySelector(".owner").innerHTML;

    // Ensure status and type values match option values
    document.getElementById("type").value = row
      .querySelector(".type")
      .innerHTML.toLowerCase();

    document.getElementById("status").value =
      row.querySelector(".status").innerHTML.toLowerCase() === "incomplete"
        ? "incompleted"
        : "completed";
    id_row = row.querySelector(".task-check .task-checkbox").id;
    // console.log(id_row);

    AddUpdateAction();
    row
      .querySelector(".task-check .task-checkbox")
      .addEventListener("change", () => {
        document.getElementById("AddUpdate").style.display = "none";
      });

    taskname = document.getElementById("task").value;
    owner = document.getElementById("owner").value;
    // console.log(taskname, owner);
  });
});

let undoStack = [];
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("delete").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".task-checkbox:checked")].map(
    (cb) => parseInt(cb.dataset.index)
  );
  // if (!selected.length) return showStatus("No rows selected ❗");

  confirmAction(`Delete ${selected.length} task(s)?`, () => {
    undoStack.push(JSON.parse(JSON.stringify(tasks)));
    for (let i = selected.length - 1; i >= 0; i--) {
      tasks.splice(selected[i], 1);
    }
    save();
    location.reload();
  });
});

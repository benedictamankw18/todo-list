// import { save } from "./dash.js";

// Placeholder if you'd like to add interactivity later
// console.log("Dashboard loaded!");
// Select all checkboxes
const select_all = document.getElementById("select-all");
if (select_all) {
  document.querySelectorAll(".task-checkbox").forEach((a) => {
    select_all.addEventListener("change", () => {
      a.checked = select_all.checked;
    });
  });
}

// Modal close functionality
document.querySelectorAll(".close").forEach((el) => {
  el.addEventListener("click", () => {
    el.closest(".modal").style.display = "none";
  });
});

// Modal open for Add/Update (UI only)
function AddUpdateAction() {
  const AddUpdate = document.getElementById("AddUpdate");
  if (AddUpdate) {
    AddUpdate.style.display = "flex";
    const close = document.getElementById("close");
    if (close) {
      close.onclick = () => (AddUpdate.style.display = "none");
    }
  }
}
document.querySelectorAll(".task-row").forEach((row) => {
  row.addEventListener("click", () => {
    AddUpdateAction();
  });
});

// Handle Add and Update buttons (submit forms via Django)
const addTaskBtn = document.getElementById("add-task");
const updateTaskBtn = document.getElementById("update-task");

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("task-form").submit();
  });
}
if (updateTaskBtn) {
  updateTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("task-form").submit();
  });
}

// Close modal on outside click or Escape key
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.style.display = "none";
    });
  }
});

// Navigation
const task_management = document.getElementById("task-management");
const dashboard = document.getElementById("dashboard");
const statistic = document.getElementById("statistic");
const info = document.getElementById("info");
const setting = document.getElementById("setting");
const logout = document.getElementById("logout");

if (statistic) {
  statistic.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("working-Container").style.display = "flex";
    setTimeout(() => {
      document.getElementById("working-Container").style.display = "none";
    }, 3000);
  });
}
if (info) {
  info.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("working-Container").style.display = "flex";
    setTimeout(() => {
      document.getElementById("working-Container").style.display = "none";
    }, 3000);
  });
}
if (setting) {
  setting.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("working-Container").style.display = "flex";
    setTimeout(() => {
      document.getElementById("working-Container").style.display = "none";
    }, 3000);
  });
}
if (task_management) {
  task_management.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/taskManager/";
  });
}
if (dashboard) {
  dashboard.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/dashboard/";
  });
}
if (logout) {
  logout.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/login/";
  });
}

// Show "Link Copied" message
const show_response = document.getElementById("show-response");
document.querySelectorAll(".share-socail").forEach((shared) => {
  shared.addEventListener("click", (event) => {
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

// The following actions (add, update, delete, clear, refresh) should be handled by Django forms/views.
// Remove all localStorage and in-browser array logic.
// Let your Django template display tasks using the tasks queryset passed from your Django view.

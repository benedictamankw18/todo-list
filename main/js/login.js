document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember").checked;
  const errorMessage = document.getElementById("error-message");

  if (!username || !password) {
    errorMessage.textContent = "Username and password are required!";
    return;
  }

  errorMessage.textContent = "";

  // For demonstration purposes:
  if (remember) {
    localStorage.setItem("savedUsername", username);
  } else {
    localStorage.removeItem("savedUsername");
  }

  // Set login status
  localStorage.setItem("isLoggedIn", "true");

  alert("Logged in successfully! ✅");
  location.href = "./../index.html";
});

window.addEventListener("DOMContentLoaded", () => {
  const savedUsername = localStorage.getItem("savedUsername");
  if (savedUsername) {
    document.getElementById("username").value = savedUsername;
    document.getElementById("remember").checked = true;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const savedUsername = localStorage.getItem("savedUsername");
  if (savedUsername) {
    const usernameInput = document.getElementById("username");
    const rememberCheckbox = document.getElementById("remember");
    if (usernameInput) usernameInput.value = savedUsername;
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function () {
      const username = document.getElementById("username").value.trim();
      const remember = document.getElementById("remember").checked;
      if (remember) {
        localStorage.setItem("savedUsername", username);
      } else {
        localStorage.removeItem("savedUsername");
      }
      // Let Django handle authentication!
    });
  }
});

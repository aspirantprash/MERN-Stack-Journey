const authorizedUsername = "aspirantbroh";
const authorizedPassword = "prashant45";
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const params = new URLSearchParams(window.location.search);
const requestedDestination = params.get("next") || "add-student.html";

function getAllowedDestination(destination) {
  const parsedDestination = new URL(destination, window.location.href);
  const allowedPages = ["add-student.html", "addstud.html", "admin-students.html"];
  const pageName = parsedDestination.pathname.split("/").pop();

  if (parsedDestination.origin !== window.location.origin || !allowedPages.includes(pageName)) {
    return "add-student.html";
  }

  return pageName + parsedDestination.search;
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    if (!username || !password || !loginMessage) {
      return;
    }

    if (username.value.trim() !== authorizedUsername || password.value !== authorizedPassword) {
      loginMessage.textContent = "Invalid username or password.";
      password.value = "";
      password.focus();
      return;
    }

    sessionStorage.setItem("addStudentAuthorized", "true");
    window.location.href = getAllowedDestination(requestedDestination);
  });
}

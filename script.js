document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const message = document.getElementById("message");
  const loginFormContainer = document.getElementById("loginForm");
  const loginFormElement = document.getElementById("loginFormElement");
  const loginMessage = document.getElementById("loginMessage");
  const signupContainer = document.querySelector(".signup-container");
  const viewDatabaseButton = document.getElementById("viewDatabase");
  const deleteDatabaseButton = document.getElementById("deleteDatabase");
  const databaseSection = document.getElementById("databaseSection");
  const databaseBody = document.getElementById("databaseBody");
  const toggleLogin = document.getElementById("toggleLogin");

  let userData = JSON.parse(localStorage.getItem("userData")) || [];

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const existingUser = userData.find((user) => user.email === email);
    if (existingUser) {
      message.textContent = "Email already exists!";
      message.className = "message error";
      return;
    }

    userData.push({ username, email, password });
    localStorage.setItem("userData", JSON.stringify(userData));

    message.textContent = "Signed up successfully!";
    message.className = "message success";

    setTimeout(() => {
      signupContainer.classList.add("hidden");
      loginFormContainer.classList.remove("hidden");
      setTimeout(() => {
        loginFormContainer.classList.add("visible");
      }, 50);
    }, 2000);
  });

  loginFormElement.addEventListener("submit", function (event) {
    event.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    userData = JSON.parse(localStorage.getItem("userData")) || [];

    const user = userData.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );

    if (user) {
      loginMessage.textContent = `Hello, ${user.username}! you have successfully Logged in`;
      loginMessage.className = "message success";
    } else {
      loginMessage.textContent = "Invalid email or password";
      loginMessage.className = "message error";
    }
  });

  const toggleSignupPassword = document.getElementById("toggleSignupPassword");
  toggleSignupPassword.addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    toggleSignupPassword.textContent = type === "password" ? "Show" : "Hide";
  });

  const toggleLoginPassword = document.getElementById("toggleLoginPassword");
  toggleLoginPassword.addEventListener("click", function () {
    const loginPasswordInput = document.getElementById("loginPassword");
    const type =
      loginPasswordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    loginPasswordInput.setAttribute("type", type);
    toggleLoginPassword.textContent = type === "password" ? "Show" : "Hide";
  });

  viewDatabaseButton.addEventListener("click", function () {
    databaseBody.innerHTML = "";

    userData.forEach((user) => {
      const row = document.createElement("tr");

      const usernameCell = document.createElement("td");
      usernameCell.textContent = user.username;
      row.appendChild(usernameCell);

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      row.appendChild(emailCell);

      const passwordCell = document.createElement("td");
      passwordCell.textContent = user.password;
      row.appendChild(passwordCell);

      databaseBody.appendChild(row);
    });

    databaseSection.style.display = "block";
  });

  deleteDatabaseButton.addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to delete all data? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("userData");
      userData = [];
      databaseBody.innerHTML = "";
      message.textContent = "All data has been deleted.";
      message.className = "message success";
    }
  });

  toggleLogin.addEventListener("click", function () {
    signupContainer.classList.add("hidden");
    loginFormContainer.classList.remove("hidden");
    setTimeout(() => {
      loginFormContainer.classList.add("visible");
    }, 50);
  });

  const closeDatabaseButton = document.getElementById("closeDatabase");

  closeDatabaseButton.addEventListener("click", function () {
    databaseSection.style.display = "none";
  });
});



const USERS_KEY = "theGoodIndianUsers";
const CURRENT_USER_KEY = "theGoodIndianCurrentUser";


function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}


function signUp(email, name, password) {
  const users = getUsers();

  // Check duplicate email
  for (let key in users) {
    if (users[key].email === email) {
      alert("User already exists!");
      return false;
    }
  }

  // Generate User1, User2, User3...
  const userId = `User${Object.keys(users).length + 1}`;

  users[userId] = {
    name: name,
    email: email,
    password: password
  };

  saveUsers(users);
  alert("Signup successful! Please login.");
  return true;
}

function login(email, password) {
  const users = getUsers();

  for (let key in users) {
    if (users[key].email === email) {
      if (users[key].password !== password) {
        alert("Incorrect password!");
        return false;
      }

      // Store logged-in user
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify({
          id: key,
          name: users[key].name,
          email: users[key].email
        })
      );

      alert("Login successful!");

      window.location.href = "index.html";
      return true;
      return true;
    }
  }

  alert("User not found!");
  return false;
}

/* ---------- LOGOUT ---------- */
function handleLogout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  alert("Logged out successfully!");
  location.reload();
}

/* ---------- CHECK LOGIN STATUS ---------- */
function isLoggedIn() {
  return getCurrentUser() !== null;
}

function updateHeaderAuth() {
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");
  const logoutLink = document.getElementById("logout-link");

  if (!loginLink || !signupLink || !logoutLink) return;

  if (isLoggedIn()) {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    logoutLink.style.display = "block";
  } else {
    loginLink.style.display = "block";
    signupLink.style.display = "block";
    logoutLink.style.display = "none";
  }
}

function updateMobileAuth() {
  const loginOpt = document.getElementById("mobile-login");
  const signupOpt = document.getElementById("mobile-signup");
  const logoutOpt = document.getElementById("mobile-logout");

  if (!loginOpt || !signupOpt || !logoutOpt) return;

  if (isLoggedIn()) {
    loginOpt.style.display = "none";
    signupOpt.style.display = "none";
    logoutOpt.style.display = "block";
  } else {
    loginOpt.style.display = "block";
    signupOpt.style.display = "block";
    logoutOpt.style.display = "none";
  }
}

function handleMobileNav(value) {
  if (!value) return;

  if (value === "login") {
    window.location.href = "Login.html";
  } else if (value === "signup") {
    window.location.href = "SignUp.html";
  } else if (value === "logout") {
    handleLogout();
  } else {
    window.location.href = value;
  }
}

function protectAuthPages() {
  const path = window.location.pathname.toLowerCase();

  if (
    isLoggedIn() &&
    (path.includes("login.html") || path.includes("signup.html"))
  ) {
    window.location.href = "index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  protectAuthPages(); 
  updateHeaderAuth();
  updateMobileAuth();
});
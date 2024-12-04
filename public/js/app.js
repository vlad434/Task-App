console.log("from client side");

const signUp_Name = document.getElementById("signup-name");
const signUp_Age = document.getElementById("signup-age");
const signUp_Email = document.getElementById("signup-email");
const signUp_Pass = document.getElementById("signup-password");

const login_Email = document.getElementById("login-email");
const login_Pass = document.getElementById("login-password");

const login_Form = document.getElementById("login-form");
const signUp_Form = document.getElementById("signup-form");

signUp_Form.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = {};
  user = {
    name: signUp_Name.value,
    age: signUp_Age.value,
    email: signUp_Email.value,
    password: signUp_Pass.value,
  };

  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.user) {
        alert(data.errorResponse.errmsg);
      } else {
        localStorage.setItem("token", data.token);
        alert("Account has been created.");
      }
    })
    .catch((err) => alert(err));
});

login_Form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userCredentials = {
    email: login_Email.value,
    password: login_Pass.value,
  };

  fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem("authToken", data.token); // Salvează token-ul corect
        // alert("Login completed");
        window.location.href = "/user";
        // console.log("Token salvat:", data.token);
      }
    })
    .catch((err) => alert(err));
});

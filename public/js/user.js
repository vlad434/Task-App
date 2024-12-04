console.log("Client from user.js");

const container = document.getElementById("container");
const userEmail = document.getElementById("user_email");
const userName = document.getElementById("user_name");
const userAge = document.getElementById("user_age");

const updateName = document.getElementById("update-name");
const updateAge = document.getElementById("update-age");
const updateEmail = document.getElementById("update-email");
const updatePassword = document.getElementById("update-password");

const updateForm = document.getElementById("update-form");

const logoutCurrentDevice = document.getElementById("logout-current-device");
const logoutAllDevices = document.getElementById("logout-all-devices");
const deleteMyAccount = document.getElementById("delete-my-account");
const uploadAvatar = document.getElementById("upload-avatar");
const deleteMyAvatar = document.getElementById("delete-my-avatar");

// console.log("Token extras din localStorage:", token);

document.addEventListener("DOMContentLoaded", init);

function init() {
  const token = localStorage.getItem("authToken");

  if (token) {
    fetch("/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Autentificare necesară!");
        }
        return res.json();
      })
      .then((data) => {
        userEmail.textContent = data.email;
        userName.textContent = data.name;
        userAge.textContent =
          data.age === null ? "Age not specified" : data.age;
      })
      .catch((err) => alert(err.message));
  } else {
    container.remove();
  }
}

//Update user
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("authToken");
  let newUser = {
    name: updateName.value,
    age: updateAge.value,
    email: updateEmail.value,
    password: updatePassword.value,
  };
  fetch("/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => alert(err));
  console.log("update with new data", newUser);
});

//Logout user
logoutCurrentDevice.addEventListener("click", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("authToken");
  fetch("/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Logout failed!");
      }
      // alert("You are now logged out!");
      localStorage.clear();
      window.location.href = "/";
    })
    .catch((err) => alert(err.message));
});

//Logout all users
logoutAllDevices.addEventListener("click", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("authToken");
  fetch("/users/logoutAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Logout all failed!");
      }
      // alert("You are now logged out!");
      localStorage.clear();
      window.location.href = "/";
    })
    .catch((err) => alert(err.message));
});

//delete my account
deleteMyAccount.addEventListener("click", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("authToken");
  fetch("/users/me", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error deleting this user!");
      }
      localStorage.clear();
      window.location.href = "/";
    })
    .catch((err) => alert(err));
});

//upload avatar
uploadAvatar.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("upload avatar");
  // const token = localStorage.getItem("authToken");
  // fetch("/users/me/avatar", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
});

//delete avatar

var signupbtn = document.getElementById("signupbtn");
var signupname = document.getElementById("signupname");
var signupemail = document.getElementById("signupemail");
var signuppassword = document.getElementById("signuppassword");
var signinemail = document.getElementById("signinemail");
var signinpassword = document.getElementById("signinpassword");
var loginbtn = document.getElementById("loginbtn");
var pathparts = location.pathname.split("/");
var baseURL = "";
for (var i = 0; i < pathparts.length - 1; i++) {
  baseURL += "/" + pathparts[i];
}
var accounts = [];
if (localStorage.getItem("data") != null) {
  accounts = JSON.parse(localStorage.getItem("data"));
}
function hellouser() {}
var username = localStorage.getItem("username");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}
function signupempty() {
  if (
    signupname.value == "" ||
    signupemail.value == "" ||
    signuppassword.value == ""
  ) {
    return false;
  }
  return true;
}
function accountexist() {
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].email.toLowerCase() === signupemail.value.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function signup() {
  if (signupempty() == false) {
    document.getElementById(
      "incorrect"
    ).innerHTML = `<span class="m-3 text-danger">All inputs is required</span>`;
  } else {
    var signup = {
      name: signupname.value,
      password: signuppassword.value,
      email: signupemail.value,
    };
    if (accounts.length == 0) {
      accounts.push(signup);
      localStorage.setItem("data", JSON.stringify(accounts));
      document.getElementById(
        "incorrect"
      ).innerHTML = `<span class="m-3 text-success">success</span>`;
      return true;
    }
    if (accountexist() == true) {
      document.getElementById(
        "incorrect"
      ).innerHTML = `<span class="m-3 text-danger">Email already exist</span>`;
    } else {
      accounts.push(signup);
      localStorage.setItem("users", JSON.stringify(accounts));
      document.getElementById("incorrect").innerHTML =
        '<span class="text-success m-3">Success</span>';
    }
  }
}
function signinempty() {
  if (signinemail.value == "" || signinpassword == "") {
    return false;
  }
  return true;
}
function login() {
  if (signinempty() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  var password = signinpassword.value;
  var email = signinemail.value;
  for (var i = 0; i < accounts.length; i++) {
    if (
      accounts[i].email.toLowerCase() === email.toLowerCase() &&
      accounts[i].password.toLowerCase() === password.toLowerCase()
    ) {
      localStorage.setItem("username", accounts[i].name);
      window.open("home.html", "_self");
    } else {
      document.getElementById("exist").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}
function logout() {
  localStorage.removeItem("username");
}

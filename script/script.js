//FRONTEND
//function to handle sign up
if (localStorage.getItem("token")) {
  window.location.href = "/pages/profile.html";
}
document.getElementById("login").classList.remove("hideForm");

async function handleSignup(e) {
  e.preventDefault();
  //spins as the page loads
  let spinner = document.querySelector(".spin1");
  spinner.classList.remove("hidespinner");
  //This displays error on the form
  let signInError = document.querySelector(".signInError");
  signInError.textContent = "";
  const signupForm = document.querySelector(`#signup`);
  let { firstName, lastName, email, password } = signupForm;
  let userInfo = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  try {
    let res = await fetch("http://localhost:7980/user/signup", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "content-type": "application/json",
      },
    });
    let jsonResponse = await res.json();
    // console.log(jsonResponse);
    if (jsonResponse.status) {
      setTimeout(() => {
        window.location.pathname = "/pages/success.html";
      }, 1000);
    } else {
      signInError.textContent = jsonResponse.message;
    }
    spinner.classList.add("hidespinner");
  } catch (error) {
    signInError.textContent = error.message;
    spinner.classList.add("hidespinner");
  }
}

document
  .querySelector(`#signup`)
  .addEventListener("submit", (e) => handleSignup(e));

//function to handle sign in
async function handleLogin(e) {
  e.preventDefault();
  let spinner = document.querySelector(".spin2");
  spinner.classList.remove("hidespinner");
  //element that displays error on the top of the form
  let logInError = document.querySelector(".logInError");
  logInError.textContent = "";
  let loginForm = document.querySelector(`#login`);
  let { email, password } = loginForm;
  let loginInfo = {
    email: email.value,
    password: password.value,
  };
  try {
    const res = await fetch("http://localhost:7980/user/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "content-type": "application/json",
      },
    });
    // Getting response from the server
    const jsonResponse = await res.json();
    if (jsonResponse.status) {
      logInError.textContent = "successful";
      logInError.style.color = "green";
      setTimeout(() => {
        window.location.pathname = "/pages/profile.html";
      }, 1000);
      localStorage.setItem("token", jsonResponse.token);
    } else {
      logInError.textContent = jsonResponse.message;
    }
    spinner.classList.add("hidespinner");
  } catch (error) {
    logInError.textContent = error.message;
    spinner.classList.add("hidespinner");
  }
}
document
  .querySelector(`#login`)
  .addEventListener("submit", (e) => handleLogin(e));

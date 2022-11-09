if (localStorage.getItem("token") === null) {
  window.location.href = "/index.html";
}

fetch("http://localhost:7980/user", {
  method: "GET",
  headers: {
    "content-type": "application/json",
    authorization: localStorage.getItem("token"),
  },
})
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    if (data.status) {
      document.getElementById(
        "fullName"
      ).innerText = `Full Name: ${data.message.firstName} ${data.message.lastName}`;
      document.getElementById(
        "email"
      ).innerText = `Email: ${data.message.email}`;
    } else {
      document.getElementById("fullName").innerText = `${data.message.message}`;
    }
  })
  .catch((error) => error.message);

document.getElementById("logout").addEventListener("click", (e) => {
  localStorage.removeItem("token");
  window.location.href = "/index.html";
});

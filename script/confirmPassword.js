function checkPass() {
  let pass1 = document.getElementById("pass1");
  let pass2 = document.getElementById("pass2");
  let message = document.getElementById("error-msg");
  message.textContent = "";
  let goodColor = "#66cc66";
  let badColor = "#ff6666";

  if (!(pass1.value.length > 5)) {
    pass1.style.backgroundColor = badColor;
    message.style.color = badColor;
    message.textContent = " you have to enter at least 6 digit!";
    return;
  }
  if (pass1.value.length > 5) {
    pass1.style.backgroundColor = goodColor;
    message.style.color = goodColor;
    message.textContent = "ok";
  }

  if (pass1.value == pass2.value) {
    pass2.style.backgroundColor = goodColor;
    message.style.color = goodColor;
    message.textContent = "ok!";
  } else {
    pass2.style.backgroundColor = badColor;
    message.style.color = badColor;
    message.textContent = " Mismatched Password";
  }
}
document.getElementById("pass1")?.addEventListener("input", checkPass);
document.getElementById("pass2")?.addEventListener("input", checkPass);

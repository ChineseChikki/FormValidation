let buttons = document.querySelectorAll(".nav_link");
let displayForm = (e, index) => {
  e.preventDefault();
  let formToDisplay = index;
  let forms = document.querySelectorAll("form");
  buttons.forEach((button, index) => {
    if (index == formToDisplay) {
      button.style.color = "#ddd";
    } else {
      button.style.color = "#fff";
    }
  });
  forms.forEach((form, index) => {
    if (index == formToDisplay) {
      form.classList.remove("hideForm");
    } else {
      form.classList.add("hideForm");
    }
  });
};

buttons.forEach((button, index) => {
  button.addEventListener("click", (e) => displayForm(e, index));
});

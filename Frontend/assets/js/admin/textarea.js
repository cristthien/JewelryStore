const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => {
  textarea.addEventListener("keyup", (e) => {
    textarea.style.height = "64px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
  });
});

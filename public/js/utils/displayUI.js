export function addLine(textContainer, text) {
  const newLine = document.createElement("p");
  newLine.innerHTML = text;
  textContainer.appendChild(newLine);
  textContainer.scrollTop = textContainer.scrollHeight;
}

export function updateButtonClass(button, location) {
  if (location !== undefined) {
    if (button.classList.length > 0) {
      [...button.classList].forEach((className) => {
        if (className === "d-none") {
          button.classList.remove("d-none");
        }
      });
    }
    button.classList.add("d-block");
  } else {
    button.classList.add("d-none");
    if (button.classList.length > 0) {
      [...button.classList].forEach((className) => {
        if (className === "d-block") {
          button.classList.remove("d-block");
        }
      });
    }
  }
}

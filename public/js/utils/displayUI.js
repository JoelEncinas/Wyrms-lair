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

export function showElement(element) {
  if (element.classList.length > 0) {
    [...element.classList].forEach((className) => {
      if (className === "d-none") {
        element.classList.remove("d-none");
      }
    });
  }
  element.classList.add("d-block");
}

export function hideElement(element) {
  if (element.classList.length > 0) {
    [...element.classList].forEach((className) => {
      if (className === "d-block") {
        element.classList.remove("d-block");
      }
    });
  }
  element.classList.add("d-none");
}

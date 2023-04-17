export function addLine(textContainer, text) {
  const newLine = document.createElement("p");
  newLine.innerHTML = text;
  textContainer.appendChild(newLine);
  textContainer.scrollTop = textContainer.scrollHeight;
}

export function updateElementClass(element, location) {
  if (location !== undefined) {
    if (element.classList.length > 0) {
      [...element.classList].forEach((className) => {
        if (className === "disabled") {
          element.classList.remove("disabled");
        }
      });
    }
  } else {
    element.classList.add("disabled");
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

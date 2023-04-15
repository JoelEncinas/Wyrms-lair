export function addLine(textContainer, text) {
    const newLine = document.createElement("p");
    newLine.innerHTML = text;
    textContainer.appendChild(newLine);
    textContainer.scrollTop = textContainer.scrollHeight;
  }
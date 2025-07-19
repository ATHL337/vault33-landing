
/**
 * typing.js - A simple typing animation effect
 * Inspired by classic terminal typing.
 */

function typeText(element, text, delay = 50, callback = null) {
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, delay);
    } else if (callback) {
      callback();
    }
  }
  typeChar();
}

document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("typed-output");
  if (el) {
    const text = el.getAttribute("data-typed-text");
    typeText(el, text);
  }
});

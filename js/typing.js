
document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".typewriter-line");
  const typeSound = document.getElementById("typeSound");
  const overlay = document.getElementById("intro-overlay");
  const terminal = document.querySelector(".terminal");

  let current = 0;

  async function typeLine(element) {
    const text = element.dataset.text;
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      if (typeSound) {
        try {
          typeSound.currentTime = 0;
          typeSound.play();
        } catch (err) {
          // Suppress autoplay errors
        }
      }
      await new Promise((r) => setTimeout(r, 25));
    }
  }

  async function typeAll() {
    while (current < lines.length) {
      await typeLine(lines[current]);
      current++;
      await new Promise((r) => setTimeout(r, 300));
    }

    // Add blinking cursor after last line
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "_";
    terminal.appendChild(cursor);
  }

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    typeAll();
  });
});

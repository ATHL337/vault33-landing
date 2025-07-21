document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".typewriter-line");
  const typeSound = document.getElementById("typeSound");
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
          // Autoplay might be blocked, ignore
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

    const lastLine = lines[lines.length - 1];
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "_";
    lastLine.appendChild(cursor);
  }

  typeAll();
});

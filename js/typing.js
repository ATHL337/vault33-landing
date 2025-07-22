document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".typewriter-line");
  const typeSound = document.getElementById("typeSound");
  let current = 0;
  let skip = false;

  function typeLine(element) {
    return new Promise((resolve) => {
      const text = element.dataset.text;
      element.textContent = "";

      let i = 0;
      const interval = setInterval(() => {
        if (skip || i >= text.length) {
          element.textContent = text;
          clearInterval(interval);
          resolve();
        } else {
          element.textContent += text[i];
          if (typeSound) {
            try {
              typeSound.currentTime = 0;
              typeSound.play();
            } catch (err) {}
          }
          i++;
        }
      }, 25);
    });
  }

  async function typeAll() {
    for (; current < lines.length; current++) {
      await typeLine(lines[current]);
      await new Promise((r) => setTimeout(r, 300));
    }

    const lastLine = lines[lines.length - 1];
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "_";
    lastLine.appendChild(cursor);
  }

  // Skip logic
  document.addEventListener("keydown", () => (skip = true));
  document.addEventListener("click", () => (skip = true));

  typeAll();
});

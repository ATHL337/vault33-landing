
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");
  const terminal = document.querySelector(".terminal");

  const navSound = new Audio("sounds/nav.mp3");
  const selectSound = new Audio("sounds/select.mp3");

  let menuItems;
  let currentIndex = 0;

  function updateSelection(index) {
    menuItems.forEach((item, i) => {
      item.classList.toggle("selected", i === index);
    });
  }

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    terminal.style.display = "block";

    // Wait for typing to finish before enabling menu navigation
    const observer = new MutationObserver(() => {
      const lastLine = document.querySelector(".typewriter-line:last-of-type");
      if (lastLine && lastLine.textContent.trim().endsWith("_")) {
        menuItems = document.querySelectorAll(".menu-item");
        updateSelection(currentIndex);
        menuItems.forEach((item) => {
          const text = item.textContent.trim().replace("[LOCKED] ", "");
          if (sessionStorage.getItem(text) === "read") {
            item.classList.add("read");
          }
        });
        observer.disconnect();
      }
    });

    observer.observe(terminal, { childList: true, subtree: true });
  });

  document.addEventListener("keydown", (e) => {
    if (!menuItems || menuItems.length === 0) return;

    // Prevent ENTER on locked items
    if (e.key === "Enter" && menuItems[currentIndex].classList.contains("locked")) {
      const flash = document.createElement("div");
      flash.style.position = "fixed";
      flash.style.top = 0;
      flash.style.left = 0;
      flash.style.width = "100vw";
      flash.style.height = "100vh";
      flash.style.background = "#0f0f0f";
      flash.style.color = "#00ff00";
      flash.style.display = "flex";
      flash.style.alignItems = "center";
      flash.style.justifyContent = "center";
      flash.style.fontSize = "3rem";
      flash.style.fontFamily = "'VT323', monospace";
      flash.style.textShadow = "0 0 3px #00ff00, 0 0 6px #00ff00";
      flash.style.zIndex = 6000;
      flash.innerHTML = `<div style='text-align:center;'>
      <h1 style='font-size:2em;'>> ACCESS DENIED</h1>
      <p style='margin-top:1em;'>First things first.</p>
      <p>Return to menu...</p>
    </div>`;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 2000);
      return;
    }

    if (e.key === "ArrowDown") {
      currentIndex = (currentIndex + 1) % menuItems.length;
      updateSelection(currentIndex);
        menuItems.forEach((item) => {
          const text = item.textContent.trim().replace("[LOCKED] ", "");
          if (sessionStorage.getItem(text) === "read") {
            item.classList.add("read");
          }
        });
      navSound.currentTime = 0;
      navSound.play();
    } else if (e.key === "ArrowUp") {
      currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      updateSelection(currentIndex);
        menuItems.forEach((item) => {
          const text = item.textContent.trim().replace("[LOCKED] ", "");
          if (sessionStorage.getItem(text) === "read") {
            item.classList.add("read");
          }
        });
      navSound.currentTime = 0;
      navSound.play();
    } else if (e.key === "Enter") {
      selectSound.play();
      const selectedText = menuItems[currentIndex].textContent.trim();
      const flash = document.createElement("div");
      flash.style.position = "fixed";
      flash.style.top = 0;
      flash.style.left = 0;
      flash.style.width = "100vw";
      flash.style.height = "100vh";
      flash.style.background = "#00ff00";
      flash.style.zIndex = 5000;
      flash.style.opacity = 1;
      flash.style.transition = "opacity 0.4s ease-out";
      document.body.appendChild(flash);
      setTimeout(() => {
        flash.style.opacity = 0;
        setTimeout(() => flash.remove(), 400);
        if (selectedText === "Rules & Access Protocols") {
        const brief = document.querySelector(".menu-item.locked");
        if (brief && brief.textContent.includes("Vault Intelligence Brief")) {
          brief.textContent = "Vault Intelligence Brief";
          brief.classList.remove("locked");
        }
      } else if (selectedText === "Vault Intelligence Brief") {
        const itemsToUnlock = document.querySelectorAll(".menu-item.locked");
        itemsToUnlock.forEach(item => {
          item.textContent = item.textContent.replace("[LOCKED] ", "");
          item.classList.remove("locked");
        });
      }
      sessionStorage.setItem(selectedText, "read");
      menuItems[currentIndex].classList.add("read");

      alert(`Selected: ${selectedText}`);
      }, 150);
    }
  });
});

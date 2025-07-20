
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

    // Wait for typing to finish before activating keyboard
    const observer = new MutationObserver(() => {
      menuItems = document.querySelectorAll(".menu-item");
      if (menuItems.length > 0 && menuItems[menuItems.length - 1].textContent.trim().endsWith("_")) {
        updateSelection(currentIndex);
        observer.disconnect();
      }
    });

    observer.observe(terminal, { childList: true, subtree: true });
  });

  document.addEventListener("keydown", (e) => {
    if (!menuItems || menuItems.length === 0) return;

    if (e.key === "ArrowDown") {
      currentIndex = (currentIndex + 1) % menuItems.length;
      updateSelection(currentIndex);
      navSound.currentTime = 0;
      navSound.play();
    } else if (e.key === "ArrowUp") {
      currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      updateSelection(currentIndex);
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
        alert(`Selected: ${selectedText}`);
      }, 150);
    }
  });
});

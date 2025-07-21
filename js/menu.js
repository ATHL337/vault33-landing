
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

  function activateMenuItem(index) {
    if (menuItems[index].classList.contains("locked")) {
      window.location.href = "access-denied.html";
      return;
    }

    selectSound.play();
    const selectedText = menuItems[index].textContent.trim();

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
      menuItems[index].classList.add("read");

      let destination = "";

switch (selectedText) {
  case "Rules & Access Protocols":
    destination = "rules.html";
    break;
  case "Vault Intelligence Brief":
    destination = "vault-intel.html";
    break;
  case "Challenge Terminals":
    destination = "challenges.html";
    break;
  case "Scoreboard":
    destination = "scoreboard.html";
    break;
  default:
    destination = ""; // fallback
}

if (destination) {
  window.location.href = destination;
}

    }, 150);
  }

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    terminal.style.display = "block";

    const observer = new MutationObserver(() => {
      const lastLine = document.querySelector(".typewriter-line:last-of-type");
      if (lastLine && lastLine.textContent.trim().endsWith("END OF TRANSMISSION")) {
        menuItems = document.querySelectorAll(".menu-item");
        updateSelection(currentIndex);
        menuItems.forEach((item, i) => {
          const text = item.textContent.trim().replace("[LOCKED] ", "");
          if (sessionStorage.getItem(text) === "read") {
            item.classList.add("read");
          }

          item.addEventListener("touchstart", () => {
            updateSelection(i);
            activateMenuItem(i);
          });

          item.addEventListener("click", () => {
            updateSelection(i);
            activateMenuItem(i);
          });
        });
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

    // Unlock logic
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

    // Redirect to appropriate page
    let destination = "";

    switch (selectedText) {
      case "Rules & Access Protocols":
        destination = "rules.html";
        break;
      case "Vault Intelligence Brief":
        destination = "vault-intel.html";
        break;
      case "Challenge Terminals":
        destination = "challenges.html";
        break;
      case "Scoreboard":
        destination = "scoreboard.html";
        break;
      default:
        destination = "";
    }

    if (destination) {
      window.location.href = destination;
    }

  }, 150);
}

  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  let currentIndex = 0;
  const navSound = new Audio("sounds/nav.mp3");
  const selectSound = new Audio("sounds/select.mp3");

  function updateSelection(index) {
    menuItems.forEach((item, i) => {
      item.classList.toggle("selected", i === index);
    });
  }

  function activateMenuItem(index) {
    const item = menuItems[index];
    const text = item.textContent.trim();

    if (item.classList.contains("locked")) {
      // Stay on current screen — optional: play error sound
      navSound.play(); // You can swap this with a "denied.mp3" if desired
    } else {
      selectSound.play();
      sessionStorage.setItem(text, "read");

      // Match on text to determine where to go
      switch (text) {
        case "Rules & Access Protocols":
          window.location.href = "rules.html";
          break;
        case "Proceed to Vault Intelligence Brief":
        case "Vault Intelligence Brief":
          window.location.href = "vault-intel.html";
          break;
        case "Access Challenge Terminals":
        case "Challenge Terminals":
          window.location.href = "challenges.html";
          break;
        default:
          // Optional: use dynamic redirect
          // window.location.href = `terminals/${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
          break;
      }
    }
  }

  // Arrow key nav
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      currentIndex = (currentIndex + 1) % menuItems.length;
      updateSelection(currentIndex);
      navSound.play();
    } else if (e.key === "ArrowUp") {
      currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      updateSelection(currentIndex);
      navSound.play();
    } else if (e.key === "Enter") {
      activateMenuItem(currentIndex);
    }
  });

  // Mouse click
  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      updateSelection(currentIndex);
      activateMenuItem(currentIndex);
    });
  });

  updateSelection(currentIndex);
});

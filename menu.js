document.addEventListener("DOMContentLoaded", () => {
  const navSound = new Audio("sounds/nav.mp3");
  const selectSound = new Audio("sounds/select.mp3");

  let menuItems = Array.from(document.querySelectorAll(".menu-item"));
  let currentIndex = 0;

  // Update which item is selected
  function updateSelection(index) {
    menuItems.forEach((item, i) => {
      item.classList.remove("selected");
      if (sessionStorage.getItem(item.textContent.trim()) === "read") {
        item.classList.add("read");
      }
      if (i === index) {
        item.classList.add("selected");
      }
    });
  }

  // Initial selection
  updateSelection(currentIndex);

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowUp") {
      navSound.play();
      currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      updateSelection(currentIndex);
    } else if (key === "ArrowDown") {
      navSound.play();
      currentIndex = (currentIndex + 1) % menuItems.length;
      updateSelection(currentIndex);
    } else if (key === "Enter") {
      const selectedItem = menuItems[currentIndex];
      handleSelection(selectedItem);
    }
  });

  // Mouse interaction
  menuItems.forEach((item, index) => {
    item.addEventListener("mouseover", () => {
      currentIndex = index;
      updateSelection(currentIndex);
    });

    item.addEventListener("click", () => {
      handleSelection(item);
    });
  });

  function handleSelection(item) {
    selectSound.play();
    const text = item.textContent.trim();

    if (item.classList.contains("locked")) {
      window.location.href = "access-denied.html";
      return;
    }

    sessionStorage.setItem(text, "read");

    // Define routing behavior per option
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
      case "Scoreboard":
        window.location.href = "scoreboard.html";
        break;
      default:
        // Handle challenge terminals or fallback
        alert(`Engaging ${text}...`);
        break;
    }
  }
});

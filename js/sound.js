
// sound.js - Vault33 interface audio hooks
function playSound(id) {
  const sound = document.getElementById(id);
  if (sound) sound.play();
}

window.addEventListener('DOMContentLoaded', () => {
  playSound('boot');
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => playSound('hover'));
    link.addEventListener('click', () => playSound('select'));
  });
});

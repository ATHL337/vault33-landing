
document.addEventListener('DOMContentLoaded', function () {
  const audio = new Audio('assets/sounds/boot.mp3');
  audio.volume = 0.6;
  audio.play().catch(e => {
    console.warn('Audio autoplay blocked. User interaction needed.');
  });
});

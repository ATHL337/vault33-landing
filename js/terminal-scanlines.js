
const scan = document.querySelector('.scanlines');
if (scan) {
  scan.animate(
    [{ opacity: 0.9 }, { opacity: 1 }],
    { duration: 80, iterations: Infinity }
  );
}

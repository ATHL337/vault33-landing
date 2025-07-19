
const countdownEl = document.getElementById('countdown');
const targetDate = new Date("August 3, 2025 08:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;
  if (diff <= 0) {
    countdownEl.innerHTML = "> Event Initiated.";
    return;
  }
  const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
  countdownEl.innerHTML = `> Initiating in: ${hours}:${minutes}:${seconds}`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

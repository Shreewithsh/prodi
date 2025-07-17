let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function updateTime() {
  const currentTime = Date.now() - startTime + elapsedTime;
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / (1000 * 60)) % 60);
  const hours = Math.floor(currentTime / (1000 * 60 * 60));

  document.getElementById('time').textContent =
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function togglePlayPause() {
  const btn = document.getElementById('playPauseBtn');

  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
    isRunning = true;
    btn.textContent = "Pause";
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
    btn.textContent = "Start";
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  document.getElementById('time').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('playPauseBtn').textContent = 'Start'; // Reset button text
}

function lap() {
  if (isRunning) {
    const currentTime = document.getElementById('time').textContent;
    const li = document.createElement('li');
    li.textContent = `Lap - ${currentTime}`;
    document.getElementById('laps').appendChild(li);
  }
}

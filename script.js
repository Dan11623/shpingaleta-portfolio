const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);

const fontSize = 16;
let columns = canvas.width / fontSize;
const rainDrops = [];
for (let x = 0; x < columns; x++) { rainDrops[x] = 1; }

function drawMatrix() {
    ctx.fillStyle = document.body.getAttribute('data-theme') === 'light' ? 'rgba(240, 244, 248, 0.1)' : 'rgba(13, 17, 23, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold ' + fontSize + 'px Arial';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) { rainDrops[i] = 0; }
        rainDrops[i]++;
    }
}
setInterval(drawMatrix, 33);

const dayZone = document.getElementById('day-zone');
const nightZone = document.getElementById('night-zone');

function switchTheme(toNight) {
    if (toNight) {
        document.body.setAttribute('data-theme', 'dark');
        dayZone.classList.add('hidden-zone');
        nightZone.classList.remove('hidden-zone');
    } else {
        document.body.setAttribute('data-theme', 'light');
        dayZone.classList.remove('hidden-zone');
        nightZone.classList.add('hidden-zone');
    }
}

document.getElementById('btn-skip').addEventListener('click', () => switchTheme(true));
document.getElementById('btn-back').addEventListener('click', () => switchTheme(false));

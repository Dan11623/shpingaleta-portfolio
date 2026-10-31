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
        document.body.classList.remove('turbo-activated');
    }
}

document.getElementById('btn-skip').addEventListener('click', () => switchTheme(true));
document.getElementById('btn-back').addEventListener('click', () => switchTheme(false));

// --- ЛОГИКА ДЛЯ КНОПКИ «ПОТ» (МАТАН ДВФУ) ---
const btnDvfu = document.getElementById('btn-dvfu');
const rainContainer = document.getElementById('math-rain-container');
const mathJokes = ['∫(x²)dx', 'lim(x→∞)', '√(-1)=i', 'МатАн', 'ДВФУ', 'ПЕРЕСДАЧА', 'ДЕДЛАЙН'];

btnDvfu.addEventListener('click', (e) => {
    e.stopPropagation();
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const item = document.createElement('div');
            item.classList.add('math-item');
            item.innerText = mathJokes[Math.floor(Math.random() * mathJokes.length)];
            item.style.left = Math.random() * 95 + 'vw';
            item.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
            rainContainer.appendChild(item);
            setTimeout(() => item.remove(), 3500);
        }, i * 60);
    }
});

// --- КНОПКА ПРОГА (СПИСОК МЕМНЫХ ОШИБОК + КРАШ) ---
const btnSys = document.getElementById('btn-sys');
const hackerModal = document.getElementById('hacker-modal');
const logText = document.getElementById('log-text');

const progErrors = [
    "[FATAL ERROR] CMakeLists.txt молча обиделся и отвалился.",
    "[FATAL ERROR] Твой код настолько плох, что компилятор закрыл VS Code.",
    "[GIT WARN] Обнаружен конфликт слияния. Ты умудрился поссориться сам с собой в Git.",
    "[ERR] Твой SSH-ключ улетел обратно во Владивосток.",
    "[STATUS] Ошибка сегментации! Память вышла из чата.",
    "[DANYCH.SYS] Всё сломалось. Инициируем синий экран для солидности..."
];

btnSys.addEventListener('click', (e) => {
    e.stopPropagation();
    hackerModal.classList.remove('hidden-modal');
    logText.innerText = "";
    
    progErrors.forEach((line, index) => {
        setTimeout(() => {
            logText.innerText += line + "\n";
            logText.scrollTop = logText.scrollHeight;
        }, index * 700);
    });

    setTimeout(() => {
        hackerModal.classList.add('hidden-modal');
        const crash = document.getElementById('crash-screen');
        crash.classList.remove('hidden');
        setTimeout(() => crash.classList.add('hidden'), 3000);
    }, 4500);
});

// --- КНОПКА РАСКЛИК ЗАПУСКАЕТ ПОЛЕТ КАРТИНКИ ДОТЫ И ХАОС ---
const btnTurbo = document.getElementById('btn-turbo');
const dotaPng = document.getElementById('bara-char');

btnTurbo.addEventListener('click', (e) => {
    e.stopPropagation();
    if (document.body.classList.contains('turbo-activated')) {
        document.body.classList.remove('turbo-activated');
        return;
    }
    dotaPng.classList.add('run-bara-animation');
    setTimeout(() => { document.body.classList.add('turbo-activated'); }, 450);
    setTimeout(() => { dotaPng.classList.remove('run-bara-animation'); }, 900);
});

document.getElementById('close-modal').addEventListener('click', () => { hackerModal.classList.add('hidden-modal'); });

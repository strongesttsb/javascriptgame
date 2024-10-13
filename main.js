let input = document.querySelector('.input'),
    btn = document.querySelector('.btn'),
    time = document.querySelector('.time'),
    gameZone = document.querySelector('.game__zone'),
    score = 0,
    gameTime = 0,
    interval = 0;

btn.addEventListener('click', () => {
    if (input.value > 4) {
        gameTime = input.value;
        input.value = '';
        gameZone.innerHTML = '';
        score = 0;
        start();
    } else {
        alert('Нужно вводить минимум 5 секунд');
    }
});

gameZone.addEventListener('click', (event) => {
    if (event.target.classList.contains('ball')) {
        score++;
        event.target.remove();
        createBall();
    }
});

function start() {
    time.innerHTML = gameTime;
    interval = setInterval(() => decrease(), 1000);
    createBall();
}

function decrease() {
    if (gameTime == 1) {
        time.innerHTML = 0;
        end();
    } else {
        time.innerHTML = --gameTime;
    }
}

function end() {
    gameZone.innerHTML = `<h2>Вы набрали ${score} баллов</h2>`;
    clearInterval(interval);
}

function createBall() {
    let ball = document.createElement('div');
    let size = random(20, 100); // случайный размер от 20 до 100
    ball.classList.add('ball');
    ball.style.width = size + 'px';
    ball.style.height = size + 'px';
    ball.style.background = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`; // случайный цвет

    // Случайная форма
    const shape = random(0, 2);
    if (shape === 0) {
        ball.style.borderRadius = '50%'; // круг
    } else if (shape === 1) {
        ball.style.borderRadius = '0'; // квадрат
    } 

    let params = gameZone.getBoundingClientRect();
    ball.style.position = 'absolute';
    ball.style.top = random(0, params.height - size) + 'px';
    ball.style.left = random(0, params.width - size) + 'px';

    gameZone.append(ball);
}

function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

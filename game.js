// Éléments du DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const mainMenu = document.getElementById('main-menu');
const gameArea = document.getElementById('game-area');
const difficultySelect = document.getElementById('difficulty');
const startButton = document.getElementById('start-game');
const returnButton = document.getElementById('return-menu');
const showHighscoreButton = document.getElementById('show-highscore');
const highScoreElement = document.getElementById('high-score');
// Nouveaux éléments pour les contrôles tactiles
const upButton = document.getElementById('up-btn');
const downButton = document.getElementById('down-btn');
const leftButton = document.getElementById('left-btn');
const rightButton = document.getElementById('right-btn');

// Configuration du jeu
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let gameSpeed = 100;
let gameLoop = null;

// Variables du jeu
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let highScores = {
    easy: 0,
    medium: 0,
    hard: 0
};

// Gestionnaires d'événements pour le menu
startButton.addEventListener('click', () => {
    mainMenu.style.display = 'none';
    gameArea.style.display = 'block';
    
    switch(difficultySelect.value) {
        case 'easy': gameSpeed = 1200; break;
        case 'medium': gameSpeed = 70; break;
        case 'hard': gameSpeed = 40; break;
    }
    
    resetGame();
});

returnButton.addEventListener('click', () => {
    mainMenu.style.display = 'flex';
    gameArea.style.display = 'none';
    if (gameLoop) clearTimeout(gameLoop);
});

showHighscoreButton.addEventListener('click', () => {
    const difficulty = difficultySelect.value;
    alert(`Meilleur score en ${difficulty}: ${highScores[difficulty]}`);
});

difficultySelect.addEventListener('change', updateHighScoreDisplay);

// Gestion des contrôles clavier
document.addEventListener('keydown', changeDirection);

// Gestion des contrôles tactiles
upButton.addEventListener('click', () => {
    if (dy !== 1) { dx = 0; dy = -1; }
});

downButton.addEventListener('click', () => {
    if (dy !== -1) { dx = 0; dy = 1; }
});

leftButton.addEventListener('click', () => {
    if (dx !== 1) { dx = -1; dy = 0; }
});

rightButton.addEventListener('click', () => {
    if (dx !== -1) { dx = 1; dy = 0; }
});

// Gestion des swipes
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Empêche le défilement de la page
});

canvas.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Détermine la direction du swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Mouvement horizontal
        if (deltaX > 0 && dx !== -1) { dx = 1; dy = 0; }  // Droite
        else if (deltaX < 0 && dx !== 1) { dx = -1; dy = 0; }  // Gauche
    } else {
        // Mouvement vertical
        if (deltaY > 0 && dy !== -1) { dx = 0; dy = 1; }  // Bas
        else if (deltaY < 0 && dy !== 1) { dx = 0; dy = -1; }  // Haut
    }
    
    e.preventDefault();
});

// Fonctions du jeu
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) { dx = -1; dy = 0; }
    if (keyPressed === UP_KEY && !goingDown) { dx = 0; dy = -1; }
    if (keyPressed === RIGHT_KEY && !goingLeft) { dx = 1; dy = 0; }
    if (keyPressed === DOWN_KEY && !goingUp) { dx = 0; dy = 1; }
}

function drawGame() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        animateScore();
        generateFood();
    } else {
        snake.pop();
    }

    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#4ecca3' : '#3aa88f';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    if (isGameOver()) {
        saveHighScore();
        alert('Game Over! Score: ' + score);
        resetGame();
        return;
    }

    gameLoop = setTimeout(drawGame, gameSpeed);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function isGameOver() {
    if (snake[0].x < 0 || snake[0].x >= tileCount || 
        snake[0].y < 0 || snake[0].y >= tileCount) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    if (gameLoop) clearTimeout(gameLoop);
    snake = [{x: 10, y: 10}];
    food = {x: 15, y: 15};
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    updateHighScoreDisplay();
    drawGame();
}

function animateScore() {
    scoreElement.classList.add('score-change');
    setTimeout(() => {
        scoreElement.classList.remove('score-change');
    }, 300);
}

function loadHighScores() {
    const savedScores = localStorage.getItem('snakeHighScores');
    if (savedScores) {
        highScores = JSON.parse(savedScores);
        updateHighScoreDisplay();
    }
}

function saveHighScore() {
    const difficulty = difficultySelect.value;
    if (score > highScores[difficulty]) {
        highScores[difficulty] = score;
        localStorage.setItem('snakeHighScores', JSON.stringify(highScores));
        updateHighScoreDisplay();
    }
}

function updateHighScoreDisplay() {
    const difficulty = difficultySelect.value;
    highScoreElement.textContent = highScores[difficulty];
}

// Initialisation
loadHighScores();
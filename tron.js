let canvas = document.getElementById('game-board');
let context = canvas.getContext('2d');
let gridSize = 20;
let direction = 'right';
let player;
let gameLoop;

// Player initialization
function startGame() {
    player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: gridSize,
        height: gridSize,
        color: '#0f0',
        dy: 0,
        dx: gridSize,
        trail: [],
        speed: 100
    };

    document.getElementById('start-game').style.display = 'none';
    direction = 'right';
    if(gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(draw, player.speed);
}

// Draw game
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    player.x += player.dx;
    player.y += player.dy;

    // Acceleration when close to wall
    let distanceToWall;
    switch (direction) {
        case 'up': distanceToWall = player.y; break;
        case 'down': distanceToWall = canvas.height - player.y; break;
        case 'left': distanceToWall = player.x; break;
        case 'right': distanceToWall = canvas.width - player.x; break;
    }
    if (distanceToWall < 100) {
        player.speed = 50;
    } else {
        player.speed = 100;
    }

    // Game over when player hits the edge
    if (player.x < 0 || player.y < 0 || player.x > canvas.width || player.y > canvas.height) {
        endGame();
    }

    // Game over when player collides with trail
    for (let i = 0; i < player.trail.length; i++) {
        if (player.x === player.trail[i].x && player.y === player.trail[i].y) {
            endGame();
        }
    }

    // Add new position to trail
    player.trail.push({x: player.x, y: player.y});

    // Draw player
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);

    // Limit trail length
    while (player.trail.length > 100) {
        player.trail.shift();
    }
}

// Update player direction
window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
                player.dy = -gridSize;
                player.dx = 0;
            }
            break;
        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
                player.dy = gridSize;
                player.dx = 0;
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
                player.dy = 0;
                player.dx = -gridSize;
            }
            break;
        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
                player.dy = 0;
                player.dx = gridSize;
            }
            break;
    }
});

// End game

function endGame() {
  clearInterval(gameLoop);
  document.getElementById('start-game').style.display = 'block';
  alert("Game Over!");
}

// Start game button
document.getElementById('start-game').addEventListener('click', startGame);

// Call startGame to start the game
startGame();

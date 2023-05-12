let canvas = document.getElementById('game-board');
let context = canvas.getContext('2d');
let gridSize = 20;
let directions = ['right', 'up'];
let players = [];
let gameLoop;

// Players initialization
function startGame() {
    players = [
        {
            x: canvas.width / 4,
            y: canvas.height / 2,
            width: gridSize,
            height: gridSize,
            color: '#0f0',
            dy: 0,
            dx: gridSize,
            trail: [],
            speed: 100
        },
        {
            x: (canvas.width / 4) * 3,
            y: canvas.height / 2,
            width: gridSize,
            height: gridSize,
            color: '#f00',
            dy: -gridSize,
            dx: 0,
            trail: [],
            speed: 100
        }
    ];

    document.getElementById('start-game').style.display = 'none';
    directions = ['right', 'up'];
    if(gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(draw, players[0].speed); // Assume both players have the same speed
}

// Draw game
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < players.length; i++) {
        updatePlayer(players[i], directions[i]);
        drawPlayer(players[i]);
    }
}

// Update player position, check for game over, and update trail
function updatePlayer(player, direction) {
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
    if (player.x < 0 || player.y < 0 || player.x >= canvas.width || player.y >= canvas.height) {
        endGame(player);
    }

    // Game over when player collides with their own trail or the other player's trail
    for (let j = 0; j < players.length; j++) {
        let trail = players[j].trail;
        for (let i = 0; i < trail.length; i++) {
            if (player.x === trail[i].x && player.y === trail[i].y) {
                endGame(player);
            }
        }
    }

    // Add new position to trail
    player.trail.push({x: player.x, y: player.y});

    // Limit trail length
    while (player.trail.length > 100) {
        player.trail.shift();
    }
}

// Draw player and their trail
function drawPlayer(player) {
    // Draw trail
    for (let i = 0; i < player.trail.length; i++) {
        context.fillStyle = player.color; // Trail color same as player color
        context.fillRect(player.trail[i].x, player.trail[i].y, player.width, player.height);
    }

    // Draw player
    // Draw player
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

// Update player direction
window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (directions[0] !== 'down') {
                directions[0] = 'up';
                players[0].dy = -gridSize;
                players[0].dx = 0;
            }
            break;
        case 'ArrowDown':
            if (directions[0] !== 'up') {
                directions[0] = 'down';
                players[0].dy = gridSize;
                players[0].dx = 0;
            }
            break;
        case 'ArrowLeft':
            if (directions[0] !== 'right') {
                directions[0] = 'left';
                players[0].dy = 0;
                players[0].dx = -gridSize;
            }
            break;
        case 'ArrowRight':
            if (directions[0] !== 'left') {
                directions[0] = 'right';
                players[0].dy = 0;
                players[0].dx = gridSize;
            }
            break;
        case 'w':
            if (directions[1] !== 'down') {
                directions[1] = 'up';
                players[1].dy = -gridSize;
                players[1].dx = 0;
            }
            break;
        case 's':
            if (directions[1] !== 'up') {
                directions[1] = 'down';
                players[1].dy = gridSize;
                players[1].dx = 0;
            }
            break;
        case 'a':
            if (directions[1] !== 'right') {
                directions[1] = 'left';
                players[1].dy = 0;
                players[1].dx = -gridSize;
            }
            break;
        case 'd':
            if (directions[1] !== 'left') {
                directions[1] = 'right';
                players[1].dy = 0;
                players[1].dx = gridSize;
            }
            break;
    }
});

// End game
function endGame(looser) {
    clearInterval(gameLoop);
    document.getElementById('start-game').style.display = 'block';

    let message = "Game Over!";
    if (looser) {
        let playerIndex = players.indexOf(looser) + 1;
        message += "\n Player " + playerIndex + " lost!";
    }
    alert(message);
}


window.addEventListener('keydown', function (e) {
    if (e.key === ' ') {
        startGame();
    }
});

// Start game button
document.getElementById('start-game').addEventListener('click', startGame);

// Call startGame to start the game
startGame();

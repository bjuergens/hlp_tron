let canvas = document.getElementById('game-board');
let context = canvas.getContext('2d');
let gridSize = 20;
let direction1 = 'right';
let direction2 = 'up';
let player1, player2;
let gameLoop;

// Players initialization
function startGame() {
    player1 = {
        x: canvas.width / 4,
        y: canvas.height / 2,
        width: gridSize,
        height: gridSize,
        color: '#0f0',
        dy: 0,
        dx: gridSize,
        trail: [],
        speed: 100
    };

    player2 = {
        x: (canvas.width / 4) * 3,
        y: canvas.height / 2,
        width: gridSize,
        height: gridSize,
        color: '#f00',
        dy: -gridSize,
        dx: 0,
        trail: [],
        speed: 100
    };

    document.getElementById('start-game').style.display = 'none';
    direction1 = 'right';
    direction2 = 'up';
    if(gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(draw, player1.speed); // Assume both players have the same speed
}

// Draw game
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer(player1, direction1);
    updatePlayer(player2, direction2);

    drawPlayer(player1);
    drawPlayer(player2);
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
    if (player.x < 0 || player.y < 0 || player.x > canvas.width || player.y > canvas.height) {
        endGame();
    }

    // Game over when player collides with their own trail or the other player's trail
    for (let i = 0; i < player.trail.length; i++) {
        if (player.x === player.trail[i].x && player.y === player.trail[i].y) {
            endGame();
        }
    }
    for (let i = 0; i < player2.trail.length; i++) {
        if (player.x === player2.trail[i].x && player.y === player2.trail[i].y) {
            endGame();
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

    // Draw player and their trail
    function drawPlayer(player) {
      // Draw trail
      for (let i = 0; i < player.trail.length; i++) {
          context.fillStyle = player.color; // Trail color same as player color
          context.fillRect(player.trail[i].x, player.trail[i].y, player.width, player.height);
      }

      // Draw player
      context.fillStyle = player.color;
      context.fillRect(player.x, player.y, player.width, player.height);
  }

  // Update player direction
  window.addEventListener('keydown', function(e) {
      switch (e.key) {
          case 'ArrowUp':
              if (direction1 !== 'down') {
                  direction1 = 'up';
                  player1.dy = -gridSize;
                  player1.dx = 0;
              }
              break;
          case 'ArrowDown':
              if (direction1 !== 'up') {
                  direction1 = 'down';
                  player1.dy = gridSize;
                  player1.dx = 0;
              }
              break;
          case 'ArrowLeft':
              if (direction1 !== 'right') {
                  direction1 = 'left';
                  player1.dy = 0;
                  player1.dx = -gridSize;
              }
              break;
          case 'ArrowRight':
              if (direction1 !== 'left') {
                  direction1 = 'right';
                  player1.dy = 0;
                  player1.dx = gridSize;
              }
              break;
          case 'w':
              if (direction2 !== 'down') {
                  direction2 = 'up';
                  player2.dy = -gridSize;
                  player2.dx = 0;
              }
              break;
          case 's':
              if (direction2 !== 'up') {
                  direction2 = 'down';
                  player2.dy = gridSize;
                  player2.dx = 0;
              }
              break;
          case 'a':
              if (direction2 !== 'right') {
                  direction2 = 'left';
                  player2.dy = 0;
                  player2.dx = -gridSize;
              }
              break;
          case 'd':
              if (direction2 !== 'left') {
                  direction2 = 'right';
                  player2.dy = 0;
                  player2.dx = gridSize;
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


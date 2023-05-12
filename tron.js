const canvas = document.getElementById('tron');
const ctx = canvas.getContext('2d');
const gridSize = 10;
let grid = [];

const player1 = { x: 50, y: 50, dx: 1, dy: 0, color: 'blue' };
const player2 = { x: 250, y: 250, dx: -1, dy: 0, color: 'red' };

function resetGame() {
  grid = [];
  for (let i = 0; i < canvas.width / gridSize; i++) {
    grid[i] = [];
  }
  player1.x = 50;
  player1.y = 50;
  player1.dx = 1;
  player1.dy = 0;

  player2.x = 250;
  player2.y = 250;
  player2.dx = -1;
  player2.dy = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(player) {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, gridSize, gridSize);
  player.x += player.dx * gridSize;
  player.y += player.dy * gridSize;

  if (player.x < 0 || player.x >= canvas.width || player.y < 0 || player.y >= canvas.height || grid[player.x / gridSize][player.y / gridSize]) {
    console.log(player.color + ' hat verloren!');
    resetGame();
  } else {
    grid[player.x / gridSize][player.y / gridSize] = true;
  }
}

const gameInterval = setInterval(gameLoop, 100);

function gameLoop() {
  drawPlayer(player1);
  drawPlayer(player2);
}

window.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'w': player1.dx = 0; player1.dy = -1; break;
    case 'a': player1.dx = -1; player1.dy = 0; break;
    case 's': player1.dx = 0; player1.dy = 1; break;
    case 'd': player1.dx = 1; player1.dy = 0; break;
    case 'ArrowUp': player2.dx = 0; player2.dy = -1; break;
    case 'ArrowLeft': player2.dx = -1; player2.dy = 0; break;
    case 'ArrowDown': player2.dx = 0; player2.dy = 1; break;
    case 'ArrowRight': player2.dx = 1; player2.dy = 0; break;
  }
});

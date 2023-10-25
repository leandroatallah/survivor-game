// Board
const BOARD_WIDTH = 360;
const BOARD_HEIGHT = 640;
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;
const GRID_WIDTH = 9;
const GRID_HEIGHT = 16;

// Character
const CHARACTER_WIDTH = 50;
const CHARACTER_HEIGHT = 50;
const CHARACTER_SPEED = 5;
const MOVE_DENSITY = 10;

class Player {
  constructor() {
    this.width = CHARACTER_WIDTH;
    this.height = CHARACTER_HEIGHT;
    this.position = {
      x: BOARD_WIDTH / 2 - CHARACTER_WIDTH / 2,
      y: BOARD_HEIGHT / 2 - CHARACTER_HEIGHT / 2,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.steps = 0;
    this.isIdle = true;
    this.isWalking = false;
    this.isRunning = false;
  }
}

let board;
let context;
const player = new Player();

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function configureBoard() {
  board = document.getElementById("board");
  board.width = BOARD_WIDTH;
  board.height = BOARD_HEIGHT;
  context = board.getContext("2d");
}

function drawLevel() {
  context.fillStyle = "gray";
  context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

  const level = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      context.fillStyle = "red";
      const x = j * TILE_WIDTH;
      const y = i * TILE_HEIGHT;

      if (level[i][j] === 1) {
        context.fillRect(x, y, TILE_WIDTH, TILE_HEIGHT);
      }
    }
  }
}

function drawCharacter() {
  context.fillStyle = "yellow";

  player.velocity.y = 0;
  player.velocity.x = 0;

  const inertia = Math.min(player.steps / MOVE_DENSITY, 1);

  let speed = CHARACTER_SPEED * inertia;

  // count steps
  if (keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight) {
    player.steps++;
  } else {
    player.steps = 0;
  }

  if ((keys.ArrowUp || keys.ArrowDown) && (keys.ArrowLeft || keys.ArrowRight)) {
    speed = speed / 1.5;
  }

  if (keys.ArrowUp) {
    player.velocity.y = speed * -1;
  } else if (keys.ArrowDown) {
    player.velocity.y = speed;
  }

  if (keys.ArrowLeft) {
    player.velocity.x = speed * -1;
  } else if (keys.ArrowRight) {
    player.velocity.x = speed;
  }

  player.position.x += player.velocity.x;
  player.position.y += player.velocity.y;

  context.fillRect(
    player.position.x,
    player.position.y,
    player.width,
    player.height
  );
}

function clearContext() {
  context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
}

function startGame() {
  configureBoard();

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        keys.ArrowUp = true;
        break;
      case "ArrowDown":
        keys.ArrowDown = true;
        break;
      case "ArrowLeft":
        keys.ArrowLeft = true;
        break;
      case "ArrowRight":
        keys.ArrowRight = true;
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "ArrowUp":
        keys.ArrowUp = false;
        break;
      case "ArrowDown":
        keys.ArrowDown = false;
        break;
      case "ArrowLeft":
        keys.ArrowLeft = false;
        break;
      case "ArrowRight":
        keys.ArrowRight = false;
        break;
    }
  });

  loop();
}

function loop() {
  clearContext();
  drawLevel();
  drawCharacter();
  requestAnimationFrame(loop);
}

window.onload = startGame;

// Board
const BOARD_WIDTH = 360;
const BOARD_HEIGHT = 640;

// Character
const CHARACTER_WIDTH = 50;
const CHARACTER_HEIGHT = 50;
const CHARACTER_SPEED = 2.5;
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
  context.fillStyle = "black";
  context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
}

function drawCharacter() {
  context.fillStyle = "red";

  // if (player.steps >= 20) {
  //   player.isRunning = true;
  //   player.isWalking = false;
  //   player.isIdle = false;
  // } else if (player.steps > 0) {
  //   player.isRunning = false;
  //   player.isWalking = true;
  //   player.isIdle = false;
  // } else {
  //   player.isRunning = false;
  //   player.isWalking = false;
  //   player.isIdle = true;
  // }

  // TODO: add lazy movement
  player.velocity.y = 0;
  player.velocity.x = 0;

  const inertia = Math.min(player.steps / MOVE_DENSITY, 2);

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
  drawCharacter();
  requestAnimationFrame(loop);
}

window.onload = startGame;

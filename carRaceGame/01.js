// selecting required HTML elements using classes
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameScreen = document.querySelector(".gameScreen");


const player = { speed: 5 };

// declared object keys initial key values are false later we'll change accordingly
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

// adding eventlistner to startScreen
startScreen.addEventListener("click", () => {
  //   gameScreen.classList.remove("hide");
  gameScreen.innerHTML = "";
  score.classList.remove("hide");
  startScreen.classList.add("hide");

  const car = document.createElement("div");
  car.setAttribute("class", "car");
  gameScreen.append(car);

  // creating roadLines using for loop
  for (let i = 0; i < 5; i++) {
    const roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = i * 150;
    roadLine.style.top = `${roadLine.y}px`;
    gameScreen.append(roadLine);
  }

  // creating enemyCars using for loop
  for (let i = 0; i < 3; i++) {
    const enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (i + 1) * 350 * -1;
    enemyCar.style.top = `${enemyCar.y}px`;
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = `${Math.floor(Math.random() * 350)}px`;
    gameScreen.append(enemyCar);
  }

  // About offsetTop - https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  player.start = true;
  player.score = 0;

  // About requestAnimationFrame() - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  window.requestAnimationFrame(startGame);
});

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  e.preventDefault();
  keys[e.key] = false;
});

const isCollide = (a, b) => {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
};

const endGame = () => {
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML = `Game Over <br> Your Final score is ${(player.score + 1)} <br> Press here to restart the game`;
};

const moveLines = () => {
  const roadLines = document.querySelectorAll(".lines");

  roadLines.forEach((line) => {
    if (line.y > 700) {
      line.y -= 750;
    }
    line.y += player.speed;
    line.style.top = `${line.y}px`;
  });
};

const moveEnemyCars = (car) => {
  const enemyCars = document.querySelectorAll(".enemy");

  enemyCars.forEach((enemyCar) => {
    if (isCollide(car, enemyCar)) {
      endGame();
    }
    if (enemyCar.y > 750) {
      enemyCar.y = -300;
      enemyCar.style.left = `${Math.floor(Math.random() * 340)}px`;
    }
    enemyCar.y += player.speed;
    enemyCar.style.top = `${enemyCar.y}px`;
  });
};

const startGame = () => {
  if (player.start) {
    const car = document.querySelector(".car");

    // The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
    const road = gameScreen.getBoundingClientRect();

    moveLines();
    moveEnemyCars(car);

    if (keys.ArrowUp && player.y > road.top + 250) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 85) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 5) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 75) {
      player.x += player.speed;
    }

    car.style.top = `${player.y}px`;
    car.style.left = `${player.x}px`;
    player.score++;
    score.innerText = `Your Score : ${player.score}`;
    window.requestAnimationFrame(startGame);
  }
};

// creating random hex color codes for cars
const randomColor = () => {
  const c = () => {
    const hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  };
  return "#" + c() + c() + c();
};




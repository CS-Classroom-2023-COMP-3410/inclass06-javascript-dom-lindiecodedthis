const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restart");
const winBox = document.getElementById("winBox");
const winMovesEl = document.getElementById("winMoves");
const winTimeEl = document.getElementById("winTime");
const playAgainBtn = document.getElementById("playAgain");
const overlay = document.getElementById("overlay");



const values = ["◕ ‿ ◕", "✯ ◡ ✯", "*≧ ω ≦*", "｡• ᵕ •｡", "¬ ‿ ¬ ", "๑ >◡< ๑", "⁀ ᗢ ⁀", "⸝⸝⸝´꒳`⸝⸝⸝"]; // 8 pairs (16 cards)

let cards = [];
let first = null;
let second = null;
let lock = false;

let moves = 0;
let matchedCount = 0;

let timer = 0;
let timerId = null;
let timerRunning = false;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startTimer() {
  // stop if already running 
  if (timerRunning) return;
  // start by setting bool to true
  timerRunning = true;
  // start running this over and over until not true, stopTimer clears interval 
  timerId = setInterval(() => {
    timer = timer + 1;
    // use html time to show the time 
    timeEl.textContent = timer;
    // run every 1000 ms
  }, 1000);
}

function stopTimer() {
  timerRunning = false;
  clearInterval(timerId);
  timerId = null;
}

function makeCards() {
  cards = [];
  const doubled = [];

    for (let i = 0; i < values.length; i++) {
    doubled.push(values[i]);
    }

    for (let i = 0; i < values.length; i++) {
    doubled.push(values[i]);
    }
  shuffle(doubled);

  doubled.forEach((val) => {
    const div = document.createElement("div");
    div.className = "card";
    div.dataset.value = val;
    div.textContent = ""; // face down
    div.addEventListener("click", function () {
        flip(div);
      });
    board.appendChild(div);
    cards.push(div);
  });
}

function flip(card) {
  if (lock) return;
  if (card.classList.contains("flipped")) return;
  if (card.classList.contains("matched")) return;

  startTimer();

  card.classList.add("flipped");
  card.textContent = card.dataset.value;

  if (!first) {
    first = card;
    return;
  }

  second = card;
  moves++;
  movesEl.textContent = moves;

  if (first.dataset.value === second.dataset.value) {
    first.classList.add("matched");
    second.classList.add("matched");
    matchedCount++;

    first = null;
    second = null;

    if (matchedCount === values.length) {
      stopTimer();
      if (matchedCount === values.length) {
        stopTimer();
      
        winMovesEl.textContent = moves;
        winTimeEl.textContent = timer;
      
        overlay.classList.remove("hidden");
      }
      ;
    }
  } else {
    lock = true;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.textContent = "";
      second.textContent = "";
      first = null;
      second = null;
      lock = false;
    }, 700);
  }
}

function restart() {
  // reset state
  overlay.classList.add("hidden");
  

  stopTimer();
  timer = 0;
  timeEl.textContent = 0;

  moves = 0;
  movesEl.textContent = 0;

  matchedCount = 0;
  first = null;
  second = null;
  lock = false;

  // reset board
  board.innerHTML = "";
  makeCards();
}

restartBtn.addEventListener("click", restart);
playAgainBtn.addEventListener("click", restart);


// start game
restart();

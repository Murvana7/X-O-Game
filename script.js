let playerTurn = "x";
let moves = 0;
let isGameOver = false;

const span = document.querySelectorAll("#container span[data-player]");
const statusEl = document.getElementById("status");

function play(cell) {
  if (isGameOver) return;
  if (cell.dataset.player !== "none") return;

  cell.textContent = playerTurn;
  cell.dataset.player = playerTurn;
  moves++;

  // check winner
  checkWinner(1, 2, 3);
  checkWinner(4, 5, 6);
  checkWinner(7, 8, 9);
  checkWinner(1, 4, 7);
  checkWinner(2, 5, 8);
  checkWinner(3, 6, 9);
  checkWinner(1, 5, 9);
  checkWinner(3, 5, 7);

  // draw
  if (moves === 9 && !isGameOver) {
    endGame(null);
    return;
  }

  // switch turn
  if (!isGameOver) {
    playerTurn = playerTurn === "x" ? "o" : "x";
    setStatus(`Turn: ${playerTurn.toUpperCase()}`);
  }
}

function checkWinner(a, b, c) {
  a--; b--; c--;
  if (isGameOver) return;

  const pA = span[a].dataset.player;
  const pB = span[b].dataset.player;
  const pC = span[c].dataset.player;

  if (pA !== "none" && pA === pB && pB === pC) {
    span[a].parentNode.classList.add("activeBox");
    span[b].parentNode.classList.add("activeBox");
    span[c].parentNode.classList.add("activeBox");
    endGame(pA);
  }
}

function endGame(winner) {
  isGameOver = true;
  setStatus(winner ? `${winner.toUpperCase()} wins!` : "Draw!");
}

function playAgain() {
  resetGame();
  setStatus(`Turn: ${playerTurn.toUpperCase()}`);
}

function resetGame() {
  for (let i = 0; i < span.length; i++) {
    span[i].dataset.player = "none";
    span[i].innerHTML = "&nbsp;";
    span[i].parentNode.classList.remove("activeBox");
  }
  playerTurn = "x";
  moves = 0;
  isGameOver = false;
}

function setStatus(text) {
  if (statusEl) statusEl.textContent = text;
}

setStatus(`Turn: ${playerTurn.toUpperCase()}`);

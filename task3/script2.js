let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let currentPlayer = "X";

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const modeSelect = document.getElementById("mode");

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  if (!isGameActive || board[index] !== "") return;

  makeMove(index, currentPlayer);

  if (checkWinner(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "Draw!";
    isGameActive = false;
    return;
  }

  if (modeSelect.value === "2p") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  } else if (modeSelect.value === "ai") {
    statusText.textContent = "AI's turn (O)...";
    setTimeout(() => {
      aiMove();
    }, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function aiMove() {
  if (!isGameActive) return;

  const emptyCells = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex, "O");

  if (checkWinner("O")) {
    statusText.textContent = "AI wins! 💻";
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "Your turn (X)";
}

function checkWinner(player) {
  return winningConditions.some(([a, b, c]) => {
    return board[a] === player && board[b] === player && board[c] === player;
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = modeSelect.value === "ai" ? "Your turn (X)" : "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}


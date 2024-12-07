const rows = 10;
const cols = 10;
const mineCount = 10;
const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
const minesweeper = document.getElementById("minesweeper");
const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", restartGame);

function placeMines() {
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (grid[row][col] !== "M") {
      grid[row][col] = "M";
      minesPlaced++;
    }
  }
}

function calculateAdjacentMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "M") continue;
      let mines = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nr = r + i;
          const nc = c + j;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === "M") {
            mines++;
          }
        }
      }
      grid[r][c] = mines;
    }
  }
}

function createGrid() {
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.row = r;
      cellDiv.dataset.col = c;
      cellDiv.addEventListener("click", () => revealCell(r, c, cellDiv));
      minesweeper.appendChild(cellDiv);
    });
  });
}

function revealCell(row, col, cellDiv) {
  if (cellDiv.classList.contains("revealed")) return;

  const cellValue = grid[row][col];
  cellDiv.classList.add("revealed");

  if (cellValue === "M") {
    cellDiv.innerText = "💣";
    cellDiv.classList.add("mine");
    alert("Game Over!");
  } else if (cellValue > 0) {
    cellDiv.innerText = cellValue;
  } else {
    revealAdjacent(row, col);
  }
}

function revealAdjacent(row, col) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const nr = row + i;
      const nc = col + j;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const adjacentCell = document.querySelector(`[data-row="${nr}"][data-col="${nc}"]`);
        if (adjacentCell && !adjacentCell.classList.contains("revealed")) {
          revealCell(nr, nc, adjacentCell);
        }
      }
    }
  }
}

function init() {
  placeMines();
  calculateAdjacentMines();
  createGrid();
}
function restartGame() {
    init();
  }

init();

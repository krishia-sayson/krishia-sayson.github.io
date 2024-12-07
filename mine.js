const rows = 10;
const cols = 10;
const mineCount = 10;
const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
const minesweeper = document.getElementById("minesweeper");
const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", restartGame);

// Function to place mines randomly
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

// Function to calculate the number of adjacent mines for each cell
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

// Function to create the grid and append it to the DOM
function createGrid() {
  minesweeper.innerHTML = ''; // Clear the grid each time before recreating
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.row = r;
      cellDiv.dataset.col = c;
      cellDiv.addEventListener("click", (event) => revealCell(r, c, cellDiv, event));
      cellDiv.addEventListener("contextmenu", (event) => toggleFlag(r, c, cellDiv, event)); // Right-click to flag
      minesweeper.appendChild(cellDiv);
    });
  });
}

// Function to reveal a cell when clicked
function revealCell(row, col, cellDiv, event) {
  if (cellDiv.classList.contains("revealed") || cellDiv.classList.contains("flagged")) return;

  const cellValue = grid[row][col];
  cellDiv.classList.add("revealed");
  cellDiv.classList.add("clicked"); // Add the clicked class for darkening

  if (cellValue === "M") {
    cellDiv.innerText = "💣";
    cellDiv.classList.add("mine");
    alert("Game Over!");
    return;
  } else if (cellValue > 0) {
    cellDiv.innerText = cellValue;
  } else {
    revealAdjacent(row, col);
  }

  checkWinCondition();
}

// Function to reveal adjacent cells when a cell with 0 is clicked
function revealAdjacent(row, col) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const nr = row + i;
      const nc = col + j;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const adjacentCell = document.querySelector(`[data-row="${nr}"][data-col="${nc}"]`);
        if (adjacentCell && !adjacentCell.classList.contains("revealed") && !adjacentCell.classList.contains("flagged")) {
          revealCell(nr, nc, adjacentCell);
        }
      }
    }
  }
}

// Function to toggle flag on right-click
function toggleFlag(row, col, cellDiv, event) {
  event.preventDefault(); // Prevent the default right-click menu
  if (cellDiv.classList.contains("revealed")) return; // Don't allow flagging revealed cells

  if (cellDiv.classList.contains("flagged")) {
    cellDiv.classList.remove("flagged");
    cellDiv.innerHTML = ""; // Remove the flag
  } else {
    cellDiv.classList.add("flagged");
    cellDiv.innerHTML = "🚩"; // Add the flag
  }

  checkWinCondition();
}

// Function to check if the player has won
function checkWinCondition() {
  let revealedCount = 0;
  let flaggedCount = 0;

  // Count revealed and flagged cells
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const cellDiv = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      if (cellDiv.classList.contains("revealed")) {
        revealedCount++;
      }
      if (cellDiv.classList.contains("flagged")) {
        flaggedCount++;
      }
    });
  });

  // Check if all non-mine cells are revealed or all mines are flagged
  if (revealedCount === rows * cols - mineCount || flaggedCount === mineCount) {
    alert("You Win!");
  }
}

// Function to initialize the game (placing mines, calculating adjacent mines, and creating the grid)
function init() {
  placeMines();
  calculateAdjacentMines();
  createGrid();
}

// Function to restart the game
function restartGame() {
  grid.forEach((row, r) => row.fill(0)); // Reset the grid array
  init();
}

// Start the game
init();

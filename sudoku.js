const initialBoard = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

function createSudokuBoard() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = ''; // Clear previous board

    initialBoard.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell, colIndex) => {
            const td = document.createElement('td');
            if (cell !== null) {
                td.textContent = cell;
                td.style.backgroundColor = '#f0f0f0'; // Pre-filled cells are grayed out
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.addEventListener('input', (e) => validateInput(e, rowIndex, colIndex));
                td.appendChild(input);
            }
            tr.appendChild(td);
        });
        grid.appendChild(tr);
    });
}

function validateInput(e, row, col) {
    const value = parseInt(e.target.value);
    if (value < 1 || value > 9 || isNaN(value)) {
        e.target.value = '';
    }
}

document.getElementById('restartButton').addEventListener('click', createSudokuBoard);

// Initialize the board on page load
createSudokuBoard();

function transformCells() {
    // Retrieve gameState from localStorage
    let gameState = JSON.parse(localStorage.getItem('gameState'));

    // Iterate over each row in the grid
    for (let i = 0; i < gameState.grid.size; i++) {
        // Iterate over each cell in the row
        for (let j = 0; j < gameState.grid.size; j++) {
            // If the cell is not null, set its value to 1024
            if (gameState.grid.cells[i][j] !== null) {
                gameState.grid.cells[i][j].value = 1024;
            }
        }
    }

    // Store the modified gameState back to localStorage
    localStorage.setItem('gameState', JSON.stringify(gameState));

    // Select all tile divs
    let tiles = document.querySelectorAll('div[class^="tile tile-"]');

    // Iterate over each tile
    tiles.forEach(tile => {
        // Change the class of the tile to 'tile-1024'
        let classes = Array.from(tile.classList);
        let tileClassIndex = classes.findIndex(cls => cls.startsWith('tile-') && cls !== 'tile-new');
        if (tileClassIndex !== -1) {
            classes[tileClassIndex] = 'tile-1024';
        }
        tile.className = classes.join(' ');

        // Select the inner div of the tile
        let innerTile = tile.querySelector('.tile-inner');

        // Update the innerHTML of the inner div
        if (innerTile) {
            innerTile.innerHTML = '1024';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Call the transformCells function
    transformCells();
}   );
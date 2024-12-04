const fs = require('fs');

//part 1

// function findXMAS(input) {
//     // convert input into a 2D grid
//     const grid = input.trim().split('\n');
//     let count = 0;
//
//     // All eight directions to check
//     const directions = [
//         [-1, -1], [-1, 0], [-1, 1],  // up-left, up, up-right
//         [0, -1],           [0, 1],    // left, right
//         [1, -1],  [1, 0],  [1, 1]     // down-left, down, down-right
//     ];
//
//     // check if position is within grid bounds
//     const isValid = (row, col) => {
//         return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
//     };
//
//     // check if XMAS pattern exists starting from a position in a given direction
//     const checkPattern = (row, col, dRow, dCol) => {
//         const pattern = "XMAS";
//         for (let i = 0; i < pattern.length; i++) {
//             const newRow = row + (dRow * i);
//             const newCol = col + (dCol * i);
//
//             if (!isValid(newRow, newCol) || grid[newRow][newCol] !== pattern[i]) {
//                 return false;
//             }
//         }
//         return true;
//     };
//
//     // iterate through each position in the grid
//     for (let row = 0; row < grid.length; row++) {
//         for (let col = 0; col < grid[row].length; col++) {
//             // Only check positions that start with 'X'
//             if (grid[row][col] === 'X') {
//                 // Check all eight directions
//                 for (const [dRow, dCol] of directions) {
//                     if (checkPattern(row, col, dRow, dCol)) {
//                         count++;
//                     }
//                 }
//             }
//         }
//     }
//
//     return count;
// }
//
// // eead input file and process
// const input = fs.readFileSync('input.txt', 'utf8');
// const result = findXMAS(input);
// console.log(`XMAS appears ${result} times in the word search`);


//part 2


// read and parse input
function parseInput(filePath) {
    return fs.readFileSync(filePath, 'utf8')
        .trim()
        .split('\n')
        .map(line => line.trim().split(''));
}

// check if a position is within grid bounds
function isValidPosition(grid, row, col) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

// check if string matches 'MAS' or 'SAM'
function isMAS(str) {
    return str === 'MAS' || str === 'SAM';
}

// get diagonal string starting from a position (direction specified by rowInc and colInc)
function getDiagonalString(grid, startRow, startCol, rowInc, colInc) {
    let str = '';
    let row = startRow;
    let col = startCol;

    for (let i = 0; i < 3; i++) {
        if (!isValidPosition(grid, row, col)) return null;
        str += grid[row][col];
        row += rowInc;
        col += colInc;
    }

    return str;
}

// check for X-MAS pattern at a specific position
function checkXMASPattern(grid, centerRow, centerCol) {
    // get the four possible diagonal strings
    const topLeftToBottomRight = getDiagonalString(grid, centerRow - 1, centerCol - 1, 1, 1);
    const topRightToBottomLeft = getDiagonalString(grid, centerRow - 1, centerCol + 1, 1, -1);

    if (!topLeftToBottomRight || !topRightToBottomLeft) return false;

    // check if either diagonal pair forms valid MAS patterns
    return (isMAS(topLeftToBottomRight) && isMAS(topRightToBottomLeft)) ||
        (isMAS(topLeftToBottomRight.split('').reverse().join('')) && isMAS(topRightToBottomLeft)) ||
        (isMAS(topLeftToBottomRight) && isMAS(topRightToBottomLeft.split('').reverse().join(''))) ||
        (isMAS(topLeftToBottomRight.split('').reverse().join('')) && isMAS(topRightToBottomLeft.split('').reverse().join('')));
}

// count all X-MAS patterns in the grid
function countXMASPatterns(grid) {
    let count = 0;

    // start from row 1 and end at grid.length-1 because we need valid positions for the full X pattern
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[0].length - 1; col++) {
            if (grid[row][col] === 'A' && checkXMASPattern(grid, row, col)) {
                count++;
            }
        }
    }

    return count;
}

// execute function
function main() {
    const grid = parseInput('input.txt');
    const result = countXMASPatterns(grid);
    console.log(`Number of X-MAS patterns found: ${result}`);
}

main();
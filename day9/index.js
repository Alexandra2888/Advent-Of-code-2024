const fs = require('fs');


//part 1
// // Read input from file
// function readInput() {
//     return fs.readFileSync('input.txt', 'utf8').trim();
// }
//
// // Convert the dense format into blocks with file IDs and free space
// function parseInitialState(input) {
//     const numbers = input.split('').map(Number);
//     let blocks = [];
//     let fileId = 0;
//     let position = 0;
//
//     // Convert alternating numbers into blocks
//     for (let i = 0; i < numbers.length; i++) {
//         const length = numbers[i];
//         if (i % 2 === 0) {
//             // File blocks
//             for (let j = 0; j < length; j++) {
//                 blocks.push(fileId);
//             }
//             fileId++;
//         } else {
//             // Free space blocks
//             for (let j = 0; j < length; j++) {
//                 blocks.push('.');
//             }
//         }
//     }
//
//     return blocks;
// }
//
// // Visualize the current state (for debugging)
// function visualizeState(blocks) {
//     return blocks.map(b => b === '.' ? '.' : b).join('');
// }
//
// // Find the leftmost free space
// function findLeftmostFreeSpace(blocks) {
//     return blocks.indexOf('.');
// }
//
// // Find the rightmost file block
// function findRightmostFile(blocks) {
//     for (let i = blocks.length - 1; i >= 0; i--) {
//         if (blocks[i] !== '.') {
//             return i;
//         }
//     }
//     return -1;
// }
//
// // Move one block from right to left
// function moveBlock(blocks) {
//     const leftPos = findLeftmostFreeSpace(blocks);
//     const rightPos = findRightmostFile(blocks);
//
//     if (leftPos === -1 || rightPos === -1 || leftPos >= rightPos) {
//         return false;
//     }
//
//     // Move the block
//     blocks[leftPos] = blocks[rightPos];
//     blocks[rightPos] = '.';
//     return true;
// }
//
// // Calculate the filesystem checksum
// function calculateChecksum(blocks) {
//     let checksum = 0;
//     for (let i = 0; i < blocks.length; i++) {
//         if (blocks[i] !== '.') {
//             checksum += i * blocks[i];
//         }
//     }
//     return checksum;
// }
//
// // Main function to solve the puzzle
// function solvePuzzle() {
//     const input = readInput();
//     const blocks = parseInitialState(input);
//
//     // Optional: Print initial state
//     console.log('Initial state:');
//     console.log(visualizeState(blocks));
//
//     // Keep moving blocks until no more moves are possible
//     let moveCount = 0;
//     while (moveBlock(blocks)) {
//         moveCount++;
//
//     }
//
//     // Calculate and return the checksum
//     const checksum = calculateChecksum(blocks);
//     console.log(`\nFinal state:`);
//     console.log(visualizeState(blocks));
//     console.log(`\nMoves made: ${moveCount}`);
//     console.log(`Checksum: ${checksum}`);
//     return checksum;
// }
//
// // Run the solution
// solvePuzzle();


//part 2


function readInput() {
    return fs.readFileSync('input.txt', 'utf8').trim();
}

function part2(input) {
    let fileSystem = [];
    let file = 0;

    // Create file system with object representation
    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) {
            fileSystem.push({ file: file++, count: parseInt(input[i]) });
        } else {
            fileSystem.push({ file: -1, count: parseInt(input[i]) });
        }
    }

    let reducedFileSystem = [];

    for (let i = 0; i < fileSystem.length; i++) {
        // If processing a gap, try to fill with as many files from right to left
        if (fileSystem[i].file === -1) {
            // Start at the end, while there is room
            let scan = fileSystem.length - 1;
            while (fileSystem[i].count > 0 && scan > i) {
                // If nonempty file has room to be put in gap, update gap size and try to find more if possible
                if (fileSystem[scan].file !== -1 && fileSystem[scan].count <= fileSystem[i].count) {
                    reducedFileSystem.push({ ...fileSystem[scan] });
                    fileSystem[i].count -= fileSystem[scan].count;
                    fileSystem[scan].file = -1;
                    scan = fileSystem.length - 1;
                }
                scan--;
            }
            // If gap is still there, make sure it is reflected in reduced
            if (fileSystem[i].count !== 0) {
                reducedFileSystem.push(fileSystem[i]);
            }
        } else if (fileSystem[i].count !== 0) {
            reducedFileSystem.push({ ...fileSystem[i] });
        }
    }

    // Compute checksum with gaps in mind
    let index = 0;
    let sum = 0;
    let current = reducedFileSystem.shift();

    while (reducedFileSystem.length !== 0) {
        if (current === undefined) break;

        if (current.file !== -1) {
            sum += current.file * index++;
            current.count--;
        } else {
            index += current.count;
            current.count = 0;
        }

        if (current.count === 0) {
            current = reducedFileSystem.shift();
        }
    }

    // Handle the last remaining item if it exists and has count > 0
    if (current && current.count > 0) {
        while (current.count > 0) {
            if (current.file !== -1) {
                sum += current.file * index++;
            } else {
                index += current.count;
            }
            current.count--;
        }
    }

    return sum;
}

// Run the solution
const input = readInput();
console.log('Part 2 solution:', part2(input));
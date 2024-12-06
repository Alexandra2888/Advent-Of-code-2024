const fs = require('fs');

//part 1
// Read and parse input
function parseInput(filename) {
    const data = fs.readFileSync(filename, 'utf8').trim();
    return data.split('\n').map(line => line.split(''));
}

// Find starting position and direction
function findStart(grid) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '^') {
                return { x, y, direction: 'up' };
            }
        }
    }
    throw new Error('No starting position (^) found in grid');
}

// Check if position is within grid bounds
function isInBounds(grid, x, y) {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
}

// Get next position based on current direction
function getNextPosition(pos) {
    switch (pos.direction) {
        case 'up': return { x: pos.x, y: pos.y - 1 };
        case 'right': return { x: pos.x + 1, y: pos.y };
        case 'down': return { x: pos.x, y: pos.y + 1 };
        case 'left': return { x: pos.x - 1, y: pos.y };
    }
}

// Turn right and get new direction
function turnRight(direction) {
    const directions = ['up', 'right', 'down', 'left'];
    const currentIndex = directions.indexOf(direction);
    return directions[(currentIndex + 1) % 4];
}

// Check if next position has obstacle
function hasObstacle(grid, nextPos) {
    if (!isInBounds(grid, nextPos.x, nextPos.y)) return true;
    return grid[nextPos.y][nextPos.x] === '#';
}

// Track guard's path and count distinct positions
function trackGuardPath(grid) {
    let currentPos = findStart(grid);
    const visited = new Set();
    visited.add(`${currentPos.x},${currentPos.y}`);
    let steps = 0;
    const maxSteps = grid.length * grid[0].length * 4; // Safety limit

    console.log('Starting position:', currentPos);

    while (steps < maxSteps) {
        // Get next position based on current direction
        const nextPos = getNextPosition(currentPos);

        // Check if guard has left the mapped area
        if (!isInBounds(grid, nextPos.x, nextPos.y)) {
            console.log('Guard left the map at:', nextPos);
            break;
        }

        // Check if guard would hit obstacle
        if (hasObstacle(grid, nextPos)) {
            // Turn right if obstacle ahead
            currentPos.direction = turnRight(currentPos.direction);
            console.log('Hit obstacle, turning right. New direction:', currentPos.direction);
        } else {
            // Move forward
            currentPos.x = nextPos.x;
            currentPos.y = nextPos.y;
            visited.add(`${currentPos.x},${currentPos.y}`);
            console.log('Moved to:', currentPos);
        }

        steps++;
        if (steps === maxSteps) {
            console.log('Reached maximum steps - possible infinite loop');
            break;
        }
    }

    return visited.size;
}

// Main execution
try {
    console.log('Reading grid from input.txt...');
    const grid = parseInput('input.txt');
    console.log('Grid size:', grid.length, 'x', grid[0].length);
    const distinctPositions = trackGuardPath(grid);
    console.log(`The guard will visit ${distinctPositions} distinct positions.`);
} catch (error) {
    console.error('Error:', error.message);
}


//part2

// Function to read and parse input file
function parseInput(filename) {
    return fs.readFileSync(filename, 'utf8');
}

const input = parseInput('input.txt');
const mapped = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));

let result = 0;
for (let obY = 0; obY < mapped.length; obY++) {
    for (let obX = 0; obX < mapped[obY].length; obX++) {
        if (mapped[obY][obX] == "#" || mapped[obY][obX] == "^") continue;
        const newMapped = mapped.map(x => x.map(x => x));
        newMapped[obY][obX] = "#";
        process.stdout.write(`\u001b[2KProcessing ${obY}/${mapped.length} ${obX}/${mapped[obY].length} - ${result}\u001b[0G`);

        let xDirection = 0;
        let yDirection = -1;
        const areasVisited = [];
        let y = newMapped.findIndex(x => x.includes("^"));
        let x = newMapped[y].indexOf("^");

        while (x >= 0 && x < newMapped[0].length && y >= 0 && y < newMapped.length) {
            if (areasVisited.some(z => z.x == x && z.y == y && z.xDirection == xDirection && z.yDirection == yDirection)) {
                result++;
                break;
            }

            areasVisited.push({ x, y, xDirection, yDirection });

            const movedX = x + xDirection;
            const movedY = y + yDirection;

            if (movedX < 0 || movedX >= newMapped[0].length || movedY < 0 || movedY >= newMapped.length) break;

            if (newMapped[movedY][movedX] == "#") {
                if (xDirection == 0 && yDirection == -1) {
                    xDirection = 1;
                    yDirection = 0;
                }
                else if (xDirection == 1 && yDirection == 0) {
                    xDirection = 0;
                    yDirection = 1;
                }
                else if (xDirection == 0 && yDirection == 1) {
                    xDirection = -1;
                    yDirection = 0;
                }
                else if (xDirection == -1 && yDirection == 0) {
                    xDirection = 0;
                    yDirection = -1;
                }
            }
            else {
                x = movedX;
                y = movedY;
            }
        }
    }
}

console.log();
console.log(result);
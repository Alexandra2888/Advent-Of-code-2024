const fs = require('fs');

//part 1

// function findTrailheadScores(grid) {
//     const rows = grid.length;
//     const cols = grid[0].length;
//     let totalScore = 0;
//
//     // Helper to check if coordinates are valid
//     function isValid(r, c) {
//         return r >= 0 && r < rows && c >= 0 && c < cols;
//     }
//
//     // DFS to find all reachable 9s from a starting point
//     function findPaths(startR, startC) {
//         const reachableNines = new Set();
//
//         function dfs(r, c, path) {
//             const currentHeight = parseInt(grid[r][c]);
//
//             if (currentHeight === 9) {
//                 reachableNines.add(`${r},${c}`);
//                 return;
//             }
//
//             const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
//             for (const [dr, dc] of directions) {
//                 const newR = r + dr;
//                 const newC = c + dc;
//
//                 if (!isValid(newR, newC)) continue;
//
//                 const newHeight = parseInt(grid[newR][newC]);
//                 const newPos = `${newR},${newC}`;
//
//                 if (newHeight === currentHeight + 1 && !path.has(newPos)) {
//                     path.add(newPos);
//                     dfs(newR, newC, path);
//                     path.delete(newPos);
//                 }
//             }
//         }
//
//         const visited = new Set([`${startR},${startC}`]);
//         dfs(startR, startC, visited);
//         return reachableNines.size;
//     }
//
//     // Process each trailhead
//     for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//             if (grid[r][c] === '0') {
//                 const score = findPaths(r, c);
//                 totalScore += score;
//             }
//         }
//     }
//
//     return totalScore;
// }
//
// const input = fs.readFileSync('input.txt', 'utf8').trim();
// const grid = input.split('\n').map(line => line.trim());
// console.log(findTrailheadScores(grid));


//part 2

function findTrailheadRatings(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let totalRating = 0;

    function isValid(r, c) {
        return r >= 0 && r < rows && c >= 0 && c < cols;
    }

    function countPaths(startR, startC) {
        const pathsFound = new Set();

        function dfs(r, c, path) {
            const currentHeight = parseInt(grid[r][c]);

            if (currentHeight === 9) {
                pathsFound.add([...path].join('|'));
                return;
            }

            const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (const [dr, dc] of directions) {
                const newR = r + dr;
                const newC = c + dc;

                if (!isValid(newR, newC)) continue;

                const newHeight = parseInt(grid[newR][newC]);
                const newPos = `${newR},${newC}`;

                if (newHeight === currentHeight + 1 && !path.has(newPos)) {
                    path.add(newPos);
                    dfs(newR, newC, path);
                    path.delete(newPos);
                }
            }
        }

        const initialPath = new Set([`${startR},${startC}`]);
        dfs(startR, startC, initialPath);
        return pathsFound.size;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '0') {
                const rating = countPaths(r, c);
                totalRating += rating;
            }
        }
    }

    return totalRating;
}

const input = fs.readFileSync('input.txt', 'utf8').trim();
const grid = input.split('\n').map(line => line.trim());
console.log(findTrailheadRatings(grid));
const fs = require('fs');

//part 1

// function parseInput(input) {
//     const lines = input.trim().split('\n');
//
//     // Find where updates start (first line with commas)
//     const separatorIndex = lines.findIndex(line => line.includes(','));
//     const rules = lines.slice(0, separatorIndex);
//     const updates = lines.slice(separatorIndex);
//
//     // Parse rules into a map: page -> Set of pages that must come after it
//     const dependencies = new Map();
//     rules.forEach(rule => {
//         if (!rule.includes('|')) return;
//         const [before, after] = rule.split('|').map(Number);
//         if (!dependencies.has(before)) {
//             dependencies.set(before, new Set());
//         }
//         dependencies.get(before).add(after);
//     });
//
//     // Parse updates into arrays of numbers
//     const parsedUpdates = updates.map(update =>
//         update.split(',').map(Number)
//     );
//
//     return { dependencies, updates: parsedUpdates };
// }
//
// function isValidOrder(update, dependencies) {
//     // For each pair of pages in the update
//     for (let i = 0; i < update.length; i++) {
//         for (let j = i + 1; j < update.length; j++) {
//             const first = update[i];
//             const second = update[j];
//
//             // Check if there's a rule saying second should come before first
//             if (dependencies.has(second) && dependencies.get(second).has(first)) {
//                 return false; // Invalid order found
//             }
//         }
//     }
//     return true;
// }
//
// function getMiddleNumber(array) {
//     return array[Math.floor(array.length / 2)];
// }
//
// function solvePuzzle(input) {
//     const { dependencies, updates } = parseInput(input);
//     let sum = 0;
//
//     updates.forEach(update => {
//         if (isValidOrder(update, dependencies)) {
//             sum += getMiddleNumber(update);
//         }
//     });
//
//     return sum;
// }
//
// // Read input and solve
// const input = fs.readFileSync('input.txt', 'utf8');
// const answer = solvePuzzle(input);
// console.log('Answer:', answer);


//part 2

function parseInput(input) {
    const lines = input.trim().split('\n');
    const separatorIndex = lines.findIndex(line => line.includes(','));
    const rules = lines.slice(0, separatorIndex);
    const updates = lines.slice(separatorIndex);

    // Parse rules into a map: page -> Set of pages that must come after it
    const dependencies = new Map();
    rules.forEach(rule => {
        if (!rule.includes('|')) return;
        const [before, after] = rule.split('|').map(Number);
        if (!dependencies.has(before)) {
            dependencies.set(before, new Set());
        }
        dependencies.get(before).add(after);
    });

    const parsedUpdates = updates.map(update =>
        update.split(',').map(Number)
    );

    return { dependencies, updates: parsedUpdates };
}

function isValidOrder(update, dependencies) {
    for (let i = 0; i < update.length; i++) {
        for (let j = i + 1; j < update.length; j++) {
            const first = update[i];
            const second = update[j];
            if (dependencies.has(second) && dependencies.get(second).has(first)) {
                return false;
            }
        }
    }
    return true;
}

function getMiddleNumber(array) {
    return array[Math.floor(array.length / 2)];
}

function buildDependencyGraph(pages, dependencies) {
    // Create adjacency map for the graph
    const graph = new Map();
    const inDegree = new Map();

    // Initialize for all pages
    pages.forEach(page => {
        graph.set(page, new Set());
        inDegree.set(page, 0);
    });

    // Build the graph
    pages.forEach(from => {
        pages.forEach(to => {
            if (dependencies.has(from) && dependencies.get(from).has(to)) {
                graph.get(from).add(to);
                inDegree.set(to, inDegree.get(to) + 1);
            }
        });
    });

    return { graph, inDegree };
}

function topologicalSort(pages, dependencies) {
    const { graph, inDegree } = buildDependencyGraph(pages, dependencies);
    const result = [];
    const stack = [...pages].filter(page => inDegree.get(page) === 0);

    // Keep track of original positions for stable sorting
    const originalPos = new Map();
    pages.forEach((page, index) => originalPos.set(page, index));

    // Sort initial stack by original position
    stack.sort((a, b) => originalPos.get(a) - originalPos.get(b));

    while (stack.length > 0) {
        const current = stack.shift();
        result.push(current);

        const neighbors = graph.get(current);
        const nextNodes = [];

        neighbors.forEach(neighbor => {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                nextNodes.push(neighbor);
            }
        });

        // Sort by original position for stable sorting
        nextNodes.sort((a, b) => originalPos.get(a) - originalPos.get(b));
        stack.push(...nextNodes);
    }

    return result;
}

function solvePart2(input) {
    const { dependencies, updates } = parseInput(input);
    let sum = 0;
    let invalidCount = 0;

    updates.forEach((update, index) => {
        if (!isValidOrder(update, dependencies)) {
            invalidCount++;
            const correctedOrder = topologicalSort(update, dependencies);
            const middleNum = getMiddleNumber(correctedOrder);
            sum += middleNum;

            // Debug output
            console.log(`Invalid update ${index + 1}:`);
            console.log(`Original: ${update.join(',')}`);
            console.log(`Corrected: ${correctedOrder.join(',')}`);
            console.log(`Middle number: ${middleNum}\n`);
        }
    });

    console.log(`Total invalid updates processed: ${invalidCount}`);
    return sum;
}

// Read input and solve
const input = fs.readFileSync('input.txt', 'utf8');
const answer = solvePart2(input);
console.log('Answer:', answer);
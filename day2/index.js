const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const result = countSafeReportsWithDampener(input);


//part 1

// const result = countSafeReports(input);

// // Parse input into arrays of numbers
// function parseInput(input) {
//     return input
//         .trim()
//         .split('\n')
//         .map(line => line.split(' ').map(Number));
// }
//
// // Check if numbers are strictly increasing or decreasing with allowed differences
// function isValidSequence(numbers) {
//     // If less than 2 numbers, it's not a valid sequence
//     if (numbers.length < 2) return false;
//
//     let increasing = null;
//
//     // Check the first pair to determine direction
//     const firstDiff = numbers[1] - numbers[0];
//     if (Math.abs(firstDiff) < 1 || Math.abs(firstDiff) > 3) return false;
//     increasing = firstDiff > 0;
//
//     // Check each adjacent pair
//     for (let i = 1; i < numbers.length - 1; i++) {
//         const diff = numbers[i + 1] - numbers[i];
//
//         // Check if difference is between 1 and 3 (inclusive)
//         if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
//
//         // Check if direction matches the established pattern
//         if ((diff > 0) !== increasing) return false;
//     }
//
//     return true;
// }
//
// function countSafeReports(input) {
//     const reports = parseInput(input);
//     return reports.reduce((count, report) => {
//         return count + (isValidSequence(report) ? 1 : 0);
//     }, 0);
// }


//part 2

// Parse input into arrays of numbers
function parseInput(input) {
    return input
        .trim()
        .split('\n')
        .map(line => line.split(' ').map(Number));
}

// Check if numbers are strictly increasing or decreasing with allowed differences
function isValidSequence(numbers) {
    // If less than 2 numbers, it's not a valid sequence
    if (numbers.length < 2) return false;

    let increasing = null;

    // Check the first pair to determine direction
    const firstDiff = numbers[1] - numbers[0];
    if (Math.abs(firstDiff) < 1 || Math.abs(firstDiff) > 3) return false;
    increasing = firstDiff > 0;

    // Check each adjacent pair
    for (let i = 1; i < numbers.length - 1; i++) {
        const diff = numbers[i + 1] - numbers[i];

        // Check if difference is between 1 and 3 (inclusive)
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

        // Check if direction matches the established pattern
        if ((diff > 0) !== increasing) return false;
    }

    return true;
}

// Try removing each number one at a time and check if sequence becomes valid
function canBeMadeValidWithRemoval(numbers) {
    // First check if it's already valid
    if (isValidSequence(numbers)) return true;

    // Try removing each number one at a time
    for (let i = 0; i < numbers.length; i++) {
        const withoutCurrent = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
        if (isValidSequence(withoutCurrent)) {
            return true;
        }
    }

    return false;
}

function countSafeReportsWithDampener(input) {
    const reports = parseInput(input);
    return reports.reduce((count, report) => {
        return count + (canBeMadeValidWithRemoval(report) ? 1 : 0);
    }, 0);
}
console.log(result);
const fs = require('fs');


//part 1
// function calculateTotalDistance(input) {
//     // Split input into lines and parse each line into pairs of numbers
//     const pairs = input
//         .trim()
//         .split('\n')
//         .map(line => {
//             const [left, right] = line.split(/\s+/);
//             return {
//                 left: parseInt(left),
//                 right: parseInt(right)
//             };
//         });
//
//     // Separate into left and right lists
//     const leftList = pairs.map(pair => pair.left);
//     const rightList = pairs.map(pair => pair.right);
//
//     // Sort both lists in ascending order
//     const sortedLeft = [...leftList].sort((a, b) => a - b);
//     const sortedRight = [...rightList].sort((a, b) => a - b);
//
//     // Calculate total distance
//     let totalDistance = 0;
//
//     // For each position, calculate the distance between paired numbers
//     for (let i = 0; i < sortedLeft.length; i++) {
//         const distance = Math.abs(sortedLeft[i] - sortedRight[i]);
//         totalDistance += distance;
//     }
//
//     return totalDistance;
// }
//
// // Read input file
// try {
//     const input = fs.readFileSync('input.txt', 'utf8');
//     const result = calculateTotalDistance(input);
//     console.log('Total distance between lists:', result);
// } catch (err) {
//     console.error('Error reading or processing file:', err);
// }
//
// module.exports = calculateTotalDistance;


//part 2
function calculateSimilarityScore(input) {
    // Split input into lines and parse each line into pairs of numbers
    const pairs = input
        .trim()
        .split('\n')
        .map(line => {
            const [left, right] = line.split(/\s+/);
            return {
                left: parseInt(left),
                right: parseInt(right)
            };
        });

    // Separate into left and right lists
    const leftList = pairs.map(pair => pair.left);
    const rightList = pairs.map(pair => pair.right);

    // Create frequency map of numbers in right list
    const rightFrequency = new Map();
    rightList.forEach(num => {
        rightFrequency.set(num, (rightFrequency.get(num) || 0) + 1);
    });

    // Calculate similarity score
    let totalScore = 0;

    // For each number in left list, multiply by its frequency in right list
    leftList.forEach(leftNum => {
        const frequency = rightFrequency.get(leftNum) || 0;
        totalScore += leftNum * frequency;
    });

    return totalScore;
}

// Read input file
try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const result = calculateSimilarityScore(input);
    console.log('Similarity score:', result);
} catch (err) {
    console.error('Error reading or processing file:', err);
}

module.exports = calculateSimilarityScore;
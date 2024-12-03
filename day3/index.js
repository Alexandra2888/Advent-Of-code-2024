const fs = require('fs');


//part 1
// // Check if a mul instruction is valid
// function isValidMul(str) {
//     // Check if it starts with exactly 'mul(' and ends with ')'
//     if (!str.startsWith('mul(') || !str.endsWith(')')) return false;
//
//     // Extract the content between the parentheses
//     const content = str.slice(4, -1);
//
//     // Split by comma
//     const parts = content.split(',');
//     if (parts.length !== 2) return false;
//
//     // Check if both parts are valid 1-3 digit numbers
//     const [x, y] = parts;
//     const numberPattern = /^\d{1,3}$/;
//
//     return numberPattern.test(x) && numberPattern.test(y);
// }
//
// // Extract and validate mul instructions
// function findValidMuls(text) {
//     const validMuls = [];
//     let currentPosition = 0;
//
//     while (true) {
//         // Find next potential mul instruction
//         const mulStart = text.indexOf('mul(', currentPosition);
//         if (mulStart === -1) break;
//
//         // Find the closing parenthesis
//         const potentialEnd = text.indexOf(')', mulStart);
//         if (potentialEnd === -1) break;
//
//         // Extract the potential instruction
//         const potentialMul = text.slice(mulStart, potentialEnd + 1);
//
//         // Validate the instruction
//         if (isValidMul(potentialMul)) {
//             validMuls.push(potentialMul);
//         }
//
//         currentPosition = mulStart + 1;
//     }
//
//     return validMuls;
// }
//
// // Function to calculate the result of a valid mul instruction
// function calculateMul(instruction) {
//     const [x, y] = instruction
//         .slice(4, -1)  // Remove 'mul(' and ')'
//         .split(',')
//         .map(Number);
//     return x * y;
// }
//
// // Main function to process the input and get the sum
// function processInput(input) {
//     const validMuls = findValidMuls(input);
//
//     const results = validMuls.map(calculateMul);
//     const sum = results.reduce((acc, curr) => acc + curr, 0);
//
//     return sum;
// }
//
// // Read input from file
// try {
//     const input = fs.readFileSync('input.txt', 'utf8');
//     const result = processInput(input);
//     console.log('Sum of all multiplication results:', result);
// } catch (err) {
//     console.error('Error reading the file:', err);
// }


//part 2


// Function to check if a mul instruction is valid
function isValidMul(str) {
    if (!str.startsWith('mul(') || !str.endsWith(')')) return false;

    const content = str.slice(4, -1);
    const parts = content.split(',');
    if (parts.length !== 2) return false;

    const [x, y] = parts;
    const numberPattern = /^\d{1,3}$/;

    return numberPattern.test(x) && numberPattern.test(y);
}

// Function to find all valid instructions (mul, do, don't)
function findValidInstructions(text) {
    const instructions = [];
    let currentPosition = 0;

    while (currentPosition < text.length) {
        // Find the next potential instruction start
        const mulStart = text.indexOf('mul(', currentPosition);
        const doStart = text.indexOf('do()', currentPosition);
        const dontStart = text.indexOf('don\'t()', currentPosition);

        // Find the earliest instruction
        const positions = [mulStart, doStart, dontStart].filter(pos => pos !== -1);
        if (positions.length === 0) break;

        const nextPos = Math.min(...positions);

        if (nextPos === mulStart) {
            // Handle mul instruction
            const potentialEnd = text.indexOf(')', mulStart);
            if (potentialEnd !== -1) {
                const potentialMul = text.slice(mulStart, potentialEnd + 1);
                if (isValidMul(potentialMul)) {
                    instructions.push({
                        type: 'mul',
                        position: mulStart,
                        instruction: potentialMul
                    });
                }
            }
            currentPosition = mulStart + 1;
        } else if (nextPos === doStart) {
            // Handle do instruction
            instructions.push({
                type: 'do',
                position: doStart
            });
            currentPosition = doStart + 4;
        } else {
            // Handle don't instruction
            instructions.push({
                type: 'dont',
                position: dontStart
            });
            currentPosition = dontStart + 7;
        }
    }

    // Sort instructions by position to maintain order
    return instructions.sort((a, b) => a.position - b.position);
}

// Function to calculate the result of a mul instruction
function calculateMul(instruction) {
    const [x, y] = instruction
        .slice(4, -1)
        .split(',')
        .map(Number);
    return x * y;
}

// Main function to process the input and get the sum
function processInput(input) {
    const instructions = findValidInstructions(input);
    let sum = 0;
    let mulEnabled = true;  // Initially enabled

    for (const instruction of instructions) {
        switch (instruction.type) {
            case 'mul':
                if (mulEnabled) {
                    sum += calculateMul(instruction.instruction);
                }
                break;
            case 'do':
                mulEnabled = true;
                break;
            case 'dont':
                mulEnabled = false;
                break;
        }
    }

    return sum;
}

// Read and process input
try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const result = processInput(input);
    console.log('Sum of enabled multiplication results:', result);
} catch (err) {
    console.error('Error reading the file:', err);
}

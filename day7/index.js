const fs = require('fs');

//part 1

// // Helper function to evaluate expression with operators
// function evaluateExpression(numbers, operators) {
//     let result = parseInt(numbers[0]);
//     for (let i = 0; i < operators.length; i++) {
//         const nextNum = parseInt(numbers[i + 1]);
//         if (operators[i] === '+') {
//             result += nextNum;
//         } else {
//             result *= nextNum;
//         }
//     }
//     return result;
// }
//
// // Generate all possible operator combinations
// function* generateOperators(length) {
//     if (length === 0) {
//         yield [];
//         return;
//     }
//
//     for (const subCombo of generateOperators(length - 1)) {
//         yield [...subCombo, '+'];
//         yield [...subCombo, '*'];
//     }
// }
//
// // Check if equation can be solved
// function canSolveEquation(testValue, numbers) {
//     const numOperators = numbers.length - 1;
//
//     for (const operators of generateOperators(numOperators)) {
//         if (evaluateExpression(numbers, operators) === testValue) {
//             return true;
//         }
//     }
//
//     return false;
// }
//
// // Main function to process input and solve puzzle
// function solvePuzzle(input) {
//     const lines = input.trim().split('\n');
//     let sum = 0;
//
//     for (const line of lines) {
//         // Extract test value and numbers
//         const [testValuePart, numbersPart] = line.split(':');
//         const testValue = parseInt(testValuePart);
//         const numbers = numbersPart.trim().split(' ').filter(n => n !== '');
//
//         // Check if equation can be solved and add to sum if true
//         if (canSolveEquation(testValue, numbers)) {
//             sum += testValue;
//         }
//     }
//
//     return sum;
// }
//
// // Read input file and solve puzzle
// try {
//     const input = fs.readFileSync('input.txt', 'utf8');
//     const result = solvePuzzle(input);
//     console.log(`The sum of valid test values is: ${result}`);
// } catch (err) {
//     console.error('Error reading or processing input:', err);
// }


//part 2


// Helper function to evaluate expression with operators
function evaluateExpression(numbers, operators) {
    let result = parseInt(numbers[0]);

    for (let i = 0; i < operators.length; i++) {
        const nextNum = parseInt(numbers[i + 1]);
        switch (operators[i]) {
            case '+':
                result += nextNum;
                break;
            case '*':
                result *= nextNum;
                break;
            case '||':
                // Convert current result and next number to strings and concatenate
                result = parseInt(result.toString() + nextNum.toString());
                break;
        }
    }

    return result;
}

// Generate all possible operator combinations
function* generateOperators(length) {
    if (length === 0) {
        yield [];
        return;
    }

    for (const subCombo of generateOperators(length - 1)) {
        yield [...subCombo, '+'];
        yield [...subCombo, '*'];
        yield [...subCombo, '||'];
    }
}

// Check if equation can be solved
function canSolveEquation(testValue, numbers) {
    const numOperators = numbers.length - 1;

    for (const operators of generateOperators(numOperators)) {
        if (evaluateExpression(numbers, operators) === testValue) {
            return true;
        }
    }

    return false;
}

// Main function to process input and solve puzzle
function solvePuzzle(input) {
    const lines = input.trim().split('\n');
    let sum = 0;

    for (const line of lines) {
        // Extract test value and numbers
        const [testValuePart, numbersPart] = line.split(':');
        const testValue = parseInt(testValuePart);
        const numbers = numbersPart.trim().split(' ').filter(n => n !== '');

        // Check if equation can be solved and add to sum if true
        if (canSolveEquation(testValue, numbers)) {
            sum += testValue;
        }
    }

    return sum;
}

// Read input file and solve puzzle
try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const result = solvePuzzle(input);
    console.log(`The sum of valid test values is: ${result}`);
} catch (err) {
    console.error('Error reading or processing input:', err);
}
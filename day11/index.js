const fs = require('fs');

function addStone(stones, key, val = 1) {
    stones[key] = (stones[key] || 0n) + BigInt(val);
}

function iterate(stones) {
    const newStones = {};

    for (const [key, count] of Object.entries(stones)) {
        if (key === '0') {
            addStone(newStones, '1', count);
        } else if (key.length % 2 === 0) {
            const mid = key.length / 2;
            const left = key.substring(0, mid).replace(/^0+/, '') || '0';
            const right = key.substring(mid).replace(/^0+/, '') || '0';
            addStone(newStones, left, count);
            addStone(newStones, right, count);
        } else {
            const newKey = (BigInt(key) * 2024n).toString();
            addStone(newStones, newKey, count);
        }
    }

    return newStones;
}

function task(blinks) {
    // Initialize stones object with input
    const input = fs.readFileSync('input.txt', 'utf8').trim();
    let stones = {};
    input.split(' ').forEach(key => addStone(stones, key));

    // Perform iterations
    for (let i = 0; i < blinks; i++) {
        if ((i + 1) % 5 === 0) {
            console.log(`After blink ${i + 1}: ${Object.values(stones).reduce((sum, count) => sum + count, 0n)} stones`);
        }
        stones = iterate(stones);
    }

    // Calculate final sum
    return Object.values(stones).reduce((sum, count) => sum + count, 0n);
}

// Run both parts
console.time('Part 1');
const result1 = task(25);
console.timeEnd('Part 1');
console.log('Part 1 Result:', result1.toString());

console.time('Part 2');
const result2 = task(75);
console.timeEnd('Part 2');
console.log('Part 2 Result:', result2.toString());
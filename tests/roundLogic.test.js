/**
 * ============================================================================
 * ROCK, PAPER, SCISSORS — AUTOMATED TEST SUITE FOR ROUND LOGIC & COMPUTER PLAY
 * Assigned to: Jehosue
 * Run with: node tests/roundLogic.test.js
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// Extract the script content from index.html to test against actual source
const indexPath = path.join(__dirname, '..', 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Simple extractor of functions for isolated unit testing
function extractFunction(source, funcName) {
  const match = source.match(new RegExp(`function\\s+${funcName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n        \\}`));
  if (!match) throw new Error(`Could not extract function ${funcName}`);
  return match[0];
}

const normalizeSelectionCode = extractFunction(indexHtml, 'normalizeSelection');
const computerPlayCode = extractFunction(indexHtml, 'computerPlay');
const playRoundCode = extractFunction(indexHtml, 'playRound');

// Create test context
const testFn = new Function(`
  ${normalizeSelectionCode}
  ${computerPlayCode}
  ${playRoundCode}
  return { normalizeSelection, computerPlay, playRound };
`);

const { normalizeSelection, computerPlay, playRound } = testFn();

console.log('================================================================');
console.log('🧪 RUNNING TESTS: Jehosue - computerPlay() & playRound()');
console.log('================================================================\n');

// 1. Test Matrix: All 9 combinations
const matrixTests = [
  { p: 'Rock',     c: 'Rock',     expected: 'draw' },
  { p: 'Rock',     c: 'Paper',    expected: 'computer' },
  { p: 'Rock',     c: 'Scissors', expected: 'player' },
  { p: 'Paper',    c: 'Rock',     expected: 'player' },
  { p: 'Paper',    c: 'Paper',    expected: 'draw' },
  { p: 'Paper',    c: 'Scissors', expected: 'computer' },
  { p: 'Scissors', c: 'Rock',     expected: 'computer' },
  { p: 'Scissors', c: 'Paper',    expected: 'player' },
  { p: 'Scissors', c: 'Scissors', expected: 'draw' },
];

let matrixPassed = 0;
console.log('1️⃣  Testing All 9 Round Combinations:');
matrixTests.forEach(({ p, c, expected }, idx) => {
  const actual = playRound(p, c);
  const pass = actual === expected;
  if (pass) matrixPassed++;
  console.log(`   [${pass ? 'PASS' : 'FAIL'}] #${idx + 1}: ${p} vs ${c} -> ${actual} (expected: ${expected})`);
});

// 2. Case-insensitivity & whitespace tests
const formattingTests = [
  { p: '  rOcK  ', c: 'SCISSORS', expected: 'player' },
  { p: 'paper',     c: '  rOCk ', expected: 'player' },
  { p: 'SCISSORS',  c: 'scissors', expected: 'draw' },
  { p: 'scissor',   c: 'PAPER',    expected: 'player' },
];

let formattingPassed = 0;
console.log('\n2️⃣  Testing Case-Insensitivity & Whitespace Trimming:');
formattingTests.forEach(({ p, c, expected }, idx) => {
  const actual = playRound(p, c);
  const pass = actual === expected;
  if (pass) formattingPassed++;
  console.log(`   [${pass ? 'PASS' : 'FAIL'}] #${idx + 1}: "${p}" vs "${c}" -> ${actual} (expected: ${expected})`);
});

// 3. Invalid inputs test
const invalidTests = [
  { p: 'lizard', c: 'spock', expected: 'invalid' },
  { p: '',       c: 'Rock',  expected: 'invalid' },
  { p: null,     c: 'Paper', expected: 'invalid' },
];

let invalidPassed = 0;
console.log('\n3️⃣  Testing Invalid Inputs:');
invalidTests.forEach(({ p, c, expected }, idx) => {
  const actual = playRound(p, c);
  const pass = actual === expected;
  if (pass) invalidPassed++;
  console.log(`   [${pass ? 'PASS' : 'FAIL'}] #${idx + 1}: "${p}" vs "${c}" -> ${actual} (expected: ${expected})`);
});

// 4. Randomness and validity of computerPlay()
console.log('\n4️⃣  Testing computerPlay() Distribution (300 rolls):');
const counts = { Rock: 0, Paper: 0, Scissors: 0, Invalid: 0 };
for (let i = 0; i < 300; i++) {
  const choice = computerPlay();
  if (counts[choice] !== undefined) {
    counts[choice]++;
  } else {
    counts.Invalid++;
  }
}
const allChoicesValid = counts.Invalid === 0 && counts.Rock > 0 && counts.Paper > 0 && counts.Scissors > 0;
console.log(`   Distribution: Rock=${counts.Rock}, Paper=${counts.Paper}, Scissors=${counts.Scissors}, Invalid=${counts.Invalid}`);
console.log(`   [${allChoicesValid ? 'PASS' : 'FAIL'}] Random selection distribution is valid.`);

const totalTests = matrixTests.length + formattingTests.length + invalidTests.length + 1;
const totalPassed = matrixPassed + formattingPassed + invalidPassed + (allChoicesValid ? 1 : 0);

console.log('\n================================================================');
console.log(`🎯 Summary: ${totalPassed}/${totalTests} tests passed.`);
console.log(totalPassed === totalTests ? '🎉 ALL TESTS PASSED!' : '❌ SOME TESTS FAILED');
console.log('================================================================\n');

if (totalPassed !== totalTests) {
  process.exit(1);
}

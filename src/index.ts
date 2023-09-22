
function runPrompt() {
  console.log("Run prompt");
}

function run(filename: string) {
  console.log(`Run file ${filename}`);
}

if (process.argv.length > 3) {
  console.log('Usage: lox [script]');
} else if (process.argv.length === 3) {
  run(process.argv[2]);
} else {
  runPrompt();
}
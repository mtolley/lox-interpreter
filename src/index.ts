import * as fs from 'node:fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import Token from './token';
import Scanner from './scanner';

async function runPrompt() {
  console.log("Run prompt");
  const rl = readline.createInterface({
    input,
    output,
  });

  let line = "";

  do {
    line = await rl.question('> ');
    console.log(line);
    if (line !== null) {
      run(line);
    }
  } while (line !== "");

  rl.close();
}

function error(line: number, message: string) {
  report(line, "", message);
}

function report(line: number, where: string, message: string) {
  console.error(`[line ${line}] Error ${where}: ${message}`);

  // TODO - I'm not keen on this kind of global state
  // hadError = true;
}

function runFile(filename: string) {
  console.log(`Run file ${filename}`);
  try {
    const source = fs.readFileSync(filename, 'utf-8');
    run(source);
  } catch (err) {
    console.error('Error reading file', err);
  }
}

function run(source: string) {
  console.log('run source');
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();
  for (const token of tokens) {
    console.log(token);
  }
}

if (process.argv.length > 3) {
  console.log('Usage: lox [script]');
} else if (process.argv.length === 3) {
  runFile(process.argv[2]);
} else {
  runPrompt().then(() => {
    console.log('No more input');
  });
}
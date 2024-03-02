import ASTPrinter from "../ast-printer";
import Expression from "../expression";
import Parser from "../parser";
import Scanner from "../scanner";

test('primary', () => {
  // arrange
  const scanner = new Scanner('nil');
  const tokens = scanner.scanTokens();
  const astPrinter = new ASTPrinter();

  // act
  const expression = new Parser(tokens).parse() as Expression;
  const parsedExpression = astPrinter.print(expression);

  // assert
  expect(parsedExpression).toBe('nil');
});

test('unary', () => {
  // arrange
  const scanner = new Scanner('-20');
  const tokens = scanner.scanTokens();
  const astPrinter = new ASTPrinter();

  // act
  const expression = new Parser(tokens).parse() as Expression;
  const parsedExpression = astPrinter.print(expression);

  // assert
  expect(parsedExpression).toBe('(- 20)');
});

test('factor', () => {
  // arrange
  const scanner = new Scanner('2 * 3');
  const tokens = scanner.scanTokens();
  const astPrinter = new ASTPrinter();

  // act
  const expression = new Parser(tokens).parse() as Expression;
  const parsedExpression = astPrinter.print(expression);

  // assert
  expect(parsedExpression).toBe('(* 2 3)');
});

test('term', () => {
  // arrange
  const scanner = new Scanner('1 + 2 - 3');
  const tokens = scanner.scanTokens();
  const astPrinter = new ASTPrinter();

  // act
  const expression = new Parser(tokens).parse() as Expression;
  const parsedExpression = astPrinter.print(expression);

  // assert
  expect(parsedExpression).toBe('(- (+ 1 2) 3)');
});

test('equality', () => {
  // arrange
  const scanner = new Scanner('1 == 2 + 3');
  const tokens = scanner.scanTokens();
  const astPrinter = new ASTPrinter();

  // act
  const expression = new Parser(tokens).parse() as Expression;
  const parsedExpression = astPrinter.print(expression);

  // assert
  expect(parsedExpression).toBe('(== 1 (+ 2 3))');
})
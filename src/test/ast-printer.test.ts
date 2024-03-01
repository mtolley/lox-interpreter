import ASTPrinter from "../ast-printer";
import LiteralExpression from "../literal-expression";
import Token from "../token";
import BinaryExpression from "../binary-expression";

test('literal expressions', () => {
  // Arrange
  const stringLiteral = new LiteralExpression("a string");
  const numberLiteral = new LiteralExpression(123);
  const nilLiteral = new LiteralExpression(null);
  const printer = new ASTPrinter();

  // Act
  const stringLiteralToString = printer.print(stringLiteral);
  const numberLiteralToString = printer.print(numberLiteral);
  const nilLiteralToString = printer.print(nilLiteral);

  // Assert
  expect(stringLiteralToString).toBe('a string');
  expect(numberLiteralToString).toBe('123');
  expect(nilLiteralToString).toBe('nil');
});

test('binary expressions', () => {
  // Arrange
  const stringLiteral = new LiteralExpression("a string");
  const numberLiteral = new LiteralExpression(123);
  const binaryExpression = new BinaryExpression(stringLiteral, new Token('PLUS', '+', null, 1), numberLiteral);
  const printer = new ASTPrinter();

  // Act
  const output = printer.print(binaryExpression);

  // Assert
  expect(output).toBe('(+ a string 123)');
});
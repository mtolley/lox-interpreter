import Scanner from "../scanner";
import Token from "../token";

test('symbols', () => {
  // Arrange
  const text = '(){},.-+;*/! != = == > >= < <=';
  const scanner = new Scanner(text);

  // Act
  const tokens = scanner.scanTokens();

  // Assert
  expect(tokens[0]).toEqual(new Token('LEFT_PAREN', '(', null, 1));
  expect(tokens[1]).toEqual(new Token('RIGHT_PAREN', ')', null, 1));
  expect(tokens[2]).toEqual(new Token('LEFT_BRACE', '{', null, 1));
  expect(tokens[3]).toEqual(new Token('RIGHT_BRACE', '}', null, 1));
  expect(tokens[4]).toEqual(new Token('COMMA', ',', null, 1));
  expect(tokens[5]).toEqual(new Token('DOT', '.', null, 1));
  expect(tokens[6]).toEqual(new Token('MINUS', '-', null, 1));
  expect(tokens[7]).toEqual(new Token('PLUS', '+', null, 1));
  expect(tokens[8]).toEqual(new Token('SEMICOLON', ';', null, 1));
  expect(tokens[9]).toEqual(new Token('STAR', '*', null, 1));
  expect(tokens[10]).toEqual(new Token('SLASH', '/', null, 1));
  expect(tokens[11]).toEqual(new Token('BANG', '!', null, 1));
  expect(tokens[12]).toEqual(new Token('BANG_EQUAL', '!=', null, 1));
  expect(tokens[13]).toEqual(new Token('EQUAL', '=', null, 1));
  expect(tokens[14]).toEqual(new Token('EQUAL_EQUAL', '==', null, 1));
  expect(tokens[15]).toEqual(new Token('GREATER', '>', null, 1));
  expect(tokens[16]).toEqual(new Token('GREATER_EQUAL', '>=', null, 1));
  expect(tokens[17]).toEqual(new Token('LESS', '<', null, 1));
  expect(tokens[18]).toEqual(new Token('LESS_EQUAL', '<=', null, 1));
  expect(tokens[19]).toEqual(new Token('EOF', "", null, 1));
});

test('keywords', () => {
  // Arrange
  const text = 'and class else false fun for if nil or print return super this true var while';
  const scanner = new Scanner(text);

  // Act
  const tokens = scanner.scanTokens();

  // Assert
  expect(tokens[0]).toEqual(new Token('AND', 'and', null, 1));
  expect(tokens[1]).toEqual(new Token('CLASS', 'class', null, 1));
  expect(tokens[2]).toEqual(new Token('ELSE', 'else', null, 1));
  expect(tokens[3]).toEqual(new Token('FALSE', 'false', null, 1));
  expect(tokens[4]).toEqual(new Token('FUN', 'fun', null, 1));
  expect(tokens[5]).toEqual(new Token('FOR', 'for', null, 1));
  expect(tokens[6]).toEqual(new Token('IF', 'if', null, 1));
  expect(tokens[7]).toEqual(new Token('NIL', 'nil', null, 1));
  expect(tokens[8]).toEqual(new Token('OR', 'or', null, 1));
  expect(tokens[9]).toEqual(new Token('PRINT', 'print', null, 1));
  expect(tokens[10]).toEqual(new Token('RETURN', 'return', null, 1));
  expect(tokens[11]).toEqual(new Token('SUPER', 'super', null, 1));
  expect(tokens[12]).toEqual(new Token('THIS', 'this', null, 1));
  expect(tokens[13]).toEqual(new Token('TRUE', 'true', null, 1));
  expect(tokens[14]).toEqual(new Token('VAR', 'var', null, 1));
  expect(tokens[15]).toEqual(new Token('WHILE', 'while', null, 1));
  expect(tokens[16]).toEqual(new Token('EOF', "", null, 1));
});

test('identifiers', () => {
  // Arrange
  const text = 'identifier1 _identifier2';
  const scanner = new Scanner(text);

  // Act
  const tokens = scanner.scanTokens();

  // Assert
  expect(tokens[0]).toEqual(new Token('IDENTIFIER', 'identifier1', null, 1));
  expect(tokens[1]).toEqual(new Token('IDENTIFIER', '_identifier2', null, 1));
  expect(tokens[2]).toEqual(new Token('EOF', "", null, 1));
});

test('literals', () => {
  // Arrange
  const text = '10 10.9 0.1 "a string" "a multiline\nstring"';
  const scanner = new Scanner(text);

  // Act
  const tokens = scanner.scanTokens();

  // Assert
  expect(tokens[0]).toEqual(new Token('NUMBER', '10', 10, 1));
  expect(tokens[1]).toEqual(new Token('NUMBER', '10.9', 10.9, 1));
  expect(tokens[2]).toEqual(new Token('NUMBER', '0.1', 0.1, 1));
  expect(tokens[3]).toEqual(new Token('STRING', '"a string"', "a string", 1));
  expect(tokens[4]).toEqual(new Token('STRING', '"a multiline\nstring"', 'a multiline\nstring', 2));
  expect(tokens[5]).toEqual(new Token('EOF', "", null, 2));
});

test('comments', () => {
  // Arrange
  const text = '// this is a comment\nidentifier\n/* this is a multiline\ncomment */';
  const scanner = new Scanner(text);

  // Act
  const tokens = scanner.scanTokens();

  // Assert
  expect(tokens[0]).toEqual(new Token('IDENTIFIER', 'identifier', null, 2));
});

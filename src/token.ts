
// export enum TokenType {
//   // Single-character tokens.
//   LEFT_PAREN, RIGHT_PAREN, LEFT_BRACE, RIGHT_BRACE,
//   COMMA, DOT, MINUS, PLUS, SEMICOLON, SLASH, STAR,

//   // One or two character tokens.
//   BANG, BANG_EQUAL,
//   EQUAL, EQUAL_EQUAL,
//   GREATER, GREATER_EQUAL,
//   LESS, LESS_EQUAL,

//   // Literals.
//   IDENTIFIER, STRING, NUMBER,

//   // Keywords.
//   AND, CLASS, ELSE, FALSE, FUN, FOR, IF, NIL, OR,
//   PRINT, RETURN, SUPER, THIS, TRUE, VAR, WHILE,

//   EOFs
// }

export type TokenType =
  "LEFT_PAREN" | "RIGHT_PAREN" | "LEFT_BRACE" | "RIGHT_BRACE" |
  "COMMA" | "DOT" | "MINUS" | "PLUS" | "SEMICOLON" | "SLASH" | "STAR" |
  "BANG" | "BANG_EQUAL" |
  "EQUAL" | "EQUAL_EQUAL" |
  "GREATER" | "GREATER_EQUAL" |
  "LESS" | "LESS_EQUAL" |
  "IDENTIFIER" | "STRING" | "NUMBER" |
  "AND" | "CLASS" | "ELSE" | "FALSE" | "FUN" | "FOR" | "IF" | "NIL" | "OR" |
  "PRINT" | "RETURN" | "SUPER" | "THIS" | "TRUE" | "VAR" | "WHILE" |
  "EOF";

type IdentifierLiteral = string;
type StringLiteral = string;
type NumberLiteral = number;

type Literal =
  | IdentifierLiteral
  | StringLiteral
  | NumberLiteral;

export default class Token {
  constructor(
    public readonly type: TokenType,
    public readonly lexeme: string,
    public readonly literal: Literal | null,
    public readonly line: number,
  ) { }

  toString(): string {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}
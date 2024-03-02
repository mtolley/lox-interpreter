import Token, { TokenType } from "./token";
import Expression from "./expression";
import BinaryExpression from "./binary-expression";
import LiteralExpression from "./literal-expression";
import UnaryExpression from "./unary-expression";

class ParserError extends Error {
  constructor() {
    super();
  }
}

class Parser {
  private current: number = 0;

  constructor(private tokens: Token[]) {
  }

  public parse(): Expression | null {
    try {
      return this.expression();
    } catch (error) {
      return null;
    }
  }
  private error(token: Token, message: string): ParserError {

    return new ParserError();
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private isAtEnd(): boolean {
    return this.peek().type === "EOF";
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.previous();
  }

  private check(type: string): boolean {
    if (this.isAtEnd()) {
      return false;
    }
    return this.peek().type === type;
  }

  private match(...types: string[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(type: string, message: string): Token {
    if (this.check(type)) {
      return this.advance();
    }
    throw this.error(this.peek(), message);
  }

  private unary(): Expression {
    if (this.match("BANG", "MINUS")) {
      let operator: Token = this.previous();
      let right: Expression = this.unary();
      return new UnaryExpression(operator, right)
    }
    return this.primary();
  }

  private factor(): Expression {
    let expression: Expression = this.unary();

    while (this.match("SLASH", "STAR")) {
      let operator: Token = this.previous();
      let right: Expression = this.unary();
      expression = new BinaryExpression(expression, operator, right);
    }
    return expression;
  }

  private primary(): Expression {
    if (this.match("FALSE")) {
      return new LiteralExpression(false);
    }
    if (this.match("TRUE")) {
      return new LiteralExpression(true);
    }
    if (this.match("NIL")) {
      return new LiteralExpression(null);
    }
    if (this.match("NUMBER", "STRING")) {
      return new LiteralExpression(this.previous().literal);
    }
    if (this.match("LEFT_PAREN")) {
      let expression: Expression = this.expression();
      this.consume("RIGHT_PAREN", "Expect ')' after expression.");
      return expression;
    }
    throw this.error(this.peek(), "Expect expression.");
  }

  private term(): Expression {
    let expression: Expression = this.factor();
    while (this.match("MINUS", "PLUS")) {
      let operator: Token = this.previous();
      let right: Expression = this.factor();
      expression = new BinaryExpression(expression, operator, right);
    }
    return expression;
  }

  private comparison(): Expression {
    let expression: Expression = this.term();
    while (this.match("GREATER", "GREATER_EQUAL", "LESS", "LESS_EQUAL")) {
      let operator: Token = this.previous();
      let right: Expression = this.term();
      expression = new BinaryExpression(expression, operator, right);
    }
    return expression;
  }

  private equality(): Expression {
    let expression: Expression = this.comparison();
    while (this.match("BANG_EQUAL", "EQUAL_EQUAL")) {
      let operator: Token = this.previous();
      let right: Expression = this.comparison();
      expression = new BinaryExpression(expression, operator, right);
    }
    return expression;
  }

  private expression(): Expression {
    return this.equality();
  }

  private synchronize(): void {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().type === "SEMICOLON") {
        return;
      }

      switch (this.peek().type) {
        case "CLASS":
        case "FUN":
        case "VAR":
        case "FOR":
        case "IF":
        case "WHILE":
        case "PRINT":
        case "RETURN":
          return;
      }

      this.advance();
    }
  }
}

export default Parser;
import Token from "./token";
import { TokenType } from "./token";
import keywords from "./keywords";
import Error from "./error";

function isDigit(c: string): boolean {
  return c >= '0' && c <= '9';
}

function isAlpha(c: string): boolean {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
}

function isAlphaNumeric(c: string): boolean {
  return isAlpha(c) || isDigit(c);
}

class Scanner {
  constructor(private readonly source: string) { }

  private start = 0;
  private current = 0;
  private line = 1;
  private tokens: Token[] = [];
  private errors: Error[] = [];

  public hasErrors(): boolean { return this.errors.length > 0; }

  public getErrors(): Error[] { return this.errors; }

  private isAtEnd(): boolean { return this.current >= this.source.length };

  private advance(): string {
    return this.source.charAt(this.current++);
  }

  /** Consumes the provided character if matched and returns true, else false */
  private match(expected: string): boolean {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) !== expected) return false;

    this.current++;
    return true;
  }

  private peek(): string {
    if (this.isAtEnd()) return '\0';
    return this.source.charAt(this.current);
  }

  private peekNext(): string {
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source.charAt(this.current + 1);
  }

  private string() {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n') this.line++;
      this.advance();
    }

    if (this.isAtEnd()) {
      this.errors.push(new Error(this.line, "Unterminated string"));
      return;
    }

    // The closing "
    this.advance();

    // Trim the surrounding quotes
    const value = this.source.substring(this.start + 1, this.current - 1);
    this.addToken("STRING", value);
  }

  private number() {
    while (isDigit(this.peek())) this.advance();

    // Look for the fractional part
    if (this.peek() === '.' && isDigit(this.peekNext())) {
      // Consume the "."
      this.advance();

      while (isDigit(this.peek())) this.advance();
    }
    this.addToken("NUMBER", Number.parseFloat(this.source.substring(this.start, this.current)));
  }

  private identifier() {
    while (isAlphaNumeric(this.peek())) this.advance();
    const text = this.source.substring(this.start, this.current);
    const type = keywords.get(text) || "IDENTIFIER";
    this.addToken(type, null);
  }

  private addToken(type: TokenType, literal?: any): void {
    const text = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, text, literal, this.line));
  }

  scanToken(): void {
    const c = this.advance();

    switch (c) {
      case ')': this.addToken("RIGHT_PAREN", null); break;
      case '(': this.addToken("LEFT_PAREN", null); break;
      case '{': this.addToken("LEFT_BRACE", null); break;
      case '}': this.addToken("RIGHT_BRACE", null); break;
      case ',': this.addToken("COMMA", null); break;
      case '.': this.addToken("DOT", null); break;
      case '-': this.addToken("MINUS", null); break;
      case '+': this.addToken("PLUS", null); break;
      case ';': this.addToken("SEMICOLON", null); break;
      case '*': this.addToken("STAR", null); break;
      case '!': this.addToken(this.match('=') ? "BANG_EQUAL" : "BANG", null); break;
      case '=': this.addToken(this.match('=') ? "EQUAL_EQUAL" : "EQUAL", null); break;
      case '<': this.addToken(this.match('=') ? "LESS_EQUAL" : "LESS", null); break;
      case '>': this.addToken(this.match('=') ? "GREATER_EQUAL" : "GREATER", null); break;

      case '/':
        if (this.match('/')) {
          // The comment // continues until the end of the line
          while (this.peek() != "\n" && !this.isAtEnd()) this.advance();
        } else if (this.match('*')) {
          let depth = 1;

          while (depth !== 0 && !this.isAtEnd()) {
            if (this.peek() === '/' && this.peekNext() === '*') {
              depth++;
            }
            if (this.peek() === '*' && this.peekNext() === '/') {
              depth--;
            }
            if (this.peek() === '\n') {
              this.line++;
            }

            this.advance();
          }

          if (this.isAtEnd()) {
            this.errors.push(new Error(this.line, "Unterminated block comment"));
          } else {
            this.advance();
          }
        } else {
          this.addToken("SLASH", null);
        }
        break;

      // case '/':
      //   if (this.match('/')) {
      //     // The comment // continues until the end of the line
      //     while (this.peek() != "\n" && !this.isAtEnd()) this.advance();
      //   } else if (this.match('*')) {
      //     // The comment /* continues until the end of the block
      //     while (this.peek() !== '*' && this.peekNext() !== '/' && !this.isAtEnd()) {
      //       if (this.peek() === '\n') this.line++;
      //       this.advance();
      //     }
      //     if (this.isAtEnd()) {
      //       this.errors.push(new Error(this.line, "Unterminated block comment"));
      //     } else {
      //       // Consume the closing */
      //       this.advance();
      //       this.advance();
      //     }
      //   } else {
      //     this.addToken("SLASH", null);
      //   }
      //   break;
      case ' ':
      case '\r':
      case '\t':
        // Ignore whitespace
        break;
      case '\n':
        this.line++;
        break;
      case '"': this.string(); break;
      default:
        if (isDigit(c)) {
          this.number();
        } else if (isAlpha(c)) {
          this.identifier();
        } else {
          this.errors.push(new Error(this.line, `Unexpected character ${c}`));
        }
        break;
    }
  }

  scanTokens(): Token[] {
    while (!this.isAtEnd()) {
      // This is the beginning of the next lexeme
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token("EOF", "", null, this.line));
    return this.tokens;
  }
}

export default Scanner;
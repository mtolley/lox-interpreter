import Token from "./token";

class Lox {
  public static error(token: Token, message: string) {
    if (token.type === "EOF") {
      this.report(token.line, " at end", message);
    } else {
      this.report(token.line, " at '" + token.lexeme + "'", message);
    }
  }

  private static report(line: number, where: string, message: string) {
    console.log(`[line ${line}] Error${where}: ${message}`);
  }
}

export default Lox;
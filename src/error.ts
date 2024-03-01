class Error {
  constructor(public line: number, public message: string) {
  }

  toString() {
    return `[line ${this.line}] Error: ${this.message}`;
  }
}

export default Error;
import BinaryExpression from "./binary-expression";
import LiteralExpression from "./literal-expression";
import Expression, { ExpressionVisitor } from "./expression";
import UnaryExpression from "./unary-expression";

class ASTPrinter implements ExpressionVisitor<string> {
  visitUnaryExpression(expression: UnaryExpression): string {
    return this.parenthesize(expression.operator.lexeme, expression.expression);
  }

  print(expression: Expression): string {
    return expression.accept(this);
  }

  visitBinaryExpression(expression: BinaryExpression): string {
    return this.parenthesize(expression.operator.lexeme, expression.left, expression.right);
  }

  visitLiteralExpression(expression: LiteralExpression): string {
    return expression.value === null ? "nil" : expression.value.toString();
  }

  visitExpression(expression: Expression): string {
    throw new Error("Method not implemented.");
  }

  parenthesize(name: string, ...expressions: Expression[]): string {
    let result = `(${name}`;

    for (const expression of expressions) {
      result += ` ${expression.accept(this)}`;
    }

    result += ")";

    return result;
  }
}

export default ASTPrinter;
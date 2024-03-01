import BinaryExpression from "./binary-expression";
import LiteralExpression from "./literal-expression";

export interface ExpressionVisitor<R> {
  visitBinaryExpression(expression: BinaryExpression): R;
  visitLiteralExpression(expression: LiteralExpression): R;
  visitExpression(expression: Expression): R;
}

class Expression {
  accept<R>(visitor: ExpressionVisitor<R>): R {
    return visitor.visitExpression(this);
  }
}

export default Expression;
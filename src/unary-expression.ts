import Expression, { ExpressionVisitor } from "./expression";
import Token from "./token";

class UnaryExpression extends Expression {
  constructor(public operator: Token, public expression: Expression) {
    super();
  }

  accept<R>(visitor: ExpressionVisitor<R>): R {
    return visitor.visitUnaryExpression(this);
  }
}

export default UnaryExpression;
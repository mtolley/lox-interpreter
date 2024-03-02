import Expression, { ExpressionVisitor } from "./expression";
import Token from "./token";

class BinaryExpression extends Expression {
  constructor(public left: Expression, public operator: Token, public right: Expression) {
    super();
  }

  accept<R>(visitor: ExpressionVisitor<R>): R {
    return visitor.visitBinaryExpression(this);
  }
}

export default BinaryExpression;
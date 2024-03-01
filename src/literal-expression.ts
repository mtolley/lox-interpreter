import Expression, { ExpressionVisitor } from "./expression";
import Token from "./token";

class LiteralExpression extends Expression {
  constructor(public value: any) {
    super();
  }

  accept<R>(visitor: ExpressionVisitor<R>): R {
    return visitor.visitLiteralExpression(this);
  }
}

export default LiteralExpression;
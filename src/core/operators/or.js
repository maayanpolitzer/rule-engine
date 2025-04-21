// const { isRuleObject } = require("../utils/isRuleObject");
import { isRuleObject } from "../utils/isRuleObject";
// const { resolveValue } = require("../utils/resolveValue");
import { resolveValue } from "../utils/resolveValue";
// const { evaluateRule } = require("../evaluateRule");
import { evaluateRule } from "../evaluateRule";

function orOperator(params, context = {}) {
  if (!Array.isArray(params)) {
    throw new Error("$or operator expects an array.");
  }

  for (let param of params) {
    if (isRuleObject(param)) {
      if (evaluateRule(param, context)) {
        return true;
      }
    } else if (resolveValue(param, context)) {
      return true;
    }
  }

  return false;
}

export default orOperator;

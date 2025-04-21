// const { isRuleObject } = require("../utils/isRuleObject");
import { isRuleObject } from "../utils/isRuleObject";
// const { resolveValue } = require("../utils/resolveValue");
import { resolveValue } from "../utils/resolveValue";
// const { evaluateRule } = require("../evaluateRule");
import { evaluateRule } from "../evaluateRule";

function andOperator(params, context = {}) {
  if (!Array.isArray(params)) {
    throw new Error("$and operator expects an array.");
  }

  for (let item of params) {
    if (isRuleObject(item)) {
      if (!evaluateRule(item, context)) {
        return false;
      }
    } else {
      if (!resolveValue(item, context)) {
        return false;
      }
    }
  }

  return true;
}

export default andOperator;

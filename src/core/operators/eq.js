// const { isRuleObject } = require("../utils/isRuleObject");
import { isRuleObject } from "../utils/isRuleObject";
// const { resolveValue } = require("../utils/resolveValue");
import { resolveValue } from "../utils/resolveValue";
// const { evaluateRule } = require("../evaluateRule");
import { evaluateRule } from "../evaluateRule";

function eqOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length < 2) {
    throw new Error(
      "$eq operator expects an array with at least two elements."
    );
  }

  const resolvedValues = params.map((value) => {
    if (isRuleObject(value)) {
      return evaluateRule(value, context);
    }
    return resolveValue(value, context);
  });

  // Check if all values are equal
  const firstValue = resolvedValues[0];
  return resolvedValues.every((v) => v === firstValue);
}

export default eqOperator;

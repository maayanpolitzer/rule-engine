const { isRuleObject } = require("../utils/isRuleObject");
const { resolveValue } = require("../utils/resolveValue");
const { evaluateRule } = require("../evaluateRule");

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

module.exports = eqOperator;

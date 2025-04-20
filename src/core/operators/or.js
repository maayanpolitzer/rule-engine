// src/core/operators/or.js
const { isRuleObject } = require("../utils/isRuleObject");
const { resolveValue } = require("../utils/resolveValue");
const { evaluateRule } = require("../evaluateRule");

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

module.exports = orOperator;

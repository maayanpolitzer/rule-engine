const { isRuleObject } = require('../utils/isRuleObject');
const { resolveValue } = require('../utils/resolveValue');
const { evaluateRule } = require('../evaluateRule');

function gteOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length !== 2) {
    throw new Error('$gte operator expects an array with exactly two elements.');
  }

  let [left, right] = params;

  if (isRuleObject(left)) {
    left = evaluateRule(left, context);
  } else {
    left = resolveValue(left, context);
  }

  if (isRuleObject(right)) {
    right = evaluateRule(right, context);
  } else {
    right = resolveValue(right, context);
  }

  return left >= right;
}

module.exports = gteOperator;

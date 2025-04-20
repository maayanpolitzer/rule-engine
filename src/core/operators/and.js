const { isRuleObject } = require('../utils/isRuleObject');
const { resolveValue } = require('../utils/resolveValue');
const { evaluateRule } = require('../evaluateRule');

function andOperator(params, context = {}) {
  if (!Array.isArray(params)) {
    throw new Error('$and operator expects an array.');
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

module.exports = andOperator;

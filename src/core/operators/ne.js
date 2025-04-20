const { resolveValue } = require('../utils/resolveValue');

function neOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length < 2) {
    throw new Error('$ne operator expects an array with at least two elements.');
  }

  const resolvedValues = params.map(p => resolveValue(p, context));
  const first = resolvedValues[0];
  return !resolvedValues.every(v => v === first);
}

module.exports = neOperator;

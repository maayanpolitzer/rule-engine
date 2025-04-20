const { resolveValue } = require('../utils/resolveValue');

function gtOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length !== 2) {
    throw new Error('$gt operator expects an array with exactly two elements.');
  }

  const [left, right] = params.map(p => resolveValue(p, context));
  return left > right;
}

module.exports = gtOperator;

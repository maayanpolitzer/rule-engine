const operators = require("./operators");
const { isRuleObject } = require("./utils/isRuleObject");

function evaluateRule(rule, context = {}) {
  if (!isRuleObject(rule)) {
    return rule;
  }

  const [operatorName, params] = Object.entries(rule)[0];
  const operatorFn = operators[operatorName];

  if (!operatorFn) {
    throw new Error(`Unsupported operator: ${operatorName}`);
  }

  let resolvedParams = params;
  if (Array.isArray(params)) {
    resolvedParams = params.map((p) => evaluateRule(p, context));
  } else if (isRuleObject(params)) {
    resolvedParams = evaluateRule(params, context);
  }
  return operatorFn(resolvedParams, context);
}

module.exports = { evaluateRule };

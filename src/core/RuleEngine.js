const { evaluateRule } = require("./evaluateRule");

function runRules(rules, options = {}, context = {}) {
  if (!Array.isArray(rules)) {
    rules = [rules];
  }
  for (const rule of rules) {
    const result = evaluateRule(rule, context);
    if (result === true) {
      return options.returnIfTrue !== undefined ? options.returnIfTrue : true;
    }
  }
  return options.returnIfFalse !== undefined ? options.returnIfFalse : false;
}

module.exports = { runRules };

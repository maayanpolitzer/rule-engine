// const { evaluateRule } = require("./evaluateRule");

import { evaluateRule } from "./evaluateRule.js";

/**
 * Evaluates one or multiple rules against an optional context.
 *
 * @function evaluateRules
 * @param {Object|Object[]} rules - A single rule object or an array of rule objects.
 * Each rule should contain an operator (like $eq, $gt, etc.) and parameters.
 *
 * @param {Object} [context={}] - Optional context data object.
 * If rule parameters contain dynamic placeholders (e.g., "{{user.age}}"),
 * they will be resolved using the context.
 *
 * @returns {boolean} Returns `true` if one rule pass, or `false` all of the rules do not pass.
 *
 * @throws {Error} Throws an error if:
 *  - An unsupported operator is encountered.
 *  - A context path does not exist.
 *  - The rule format is invalid.
 *
 * @example
 * const rules = [
 *   { $gte: ["{{user.age}}", 18] },
 *   { $eq: ["{{user.role}}", "admin"] }
 * ];
 *
 * const context = {
 *   user: { age: 25, role: "admin" }
 * };
 *
 * const result = evaluateRules(rules, context);
 * console.log(result); // Output: true
 */
function evaluateRules(rules, context = {}) {
  if (!Array.isArray(rules)) {
    rules = [rules];
  }
  for (const rule of rules) {
    const result = evaluateRule(rule, context);
    if (result) {
      return true;
    }
  }
  return false;
}

// module.exports = { evaluateRules };

export { evaluateRules };

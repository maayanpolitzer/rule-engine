function isRuleObject(obj) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Object.keys(obj).length === 1 &&
    Object.keys(obj)[0].startsWith("$")
  );
}

function resolveValue(value, context) {
  if (typeof value === "string") {
    const match = value.match(/^{{(.*?)}}$/);

    if (match) {
      const path = match[1].trim();
      const parts = path.split(".");

      let result = context;
      for (const part of parts) {
        if (result == null || !(part in result)) {
          throw new Error(`Path "${path}" does not exist in context.`);
        }
        result = result[part];
      }
      return result;
    }
  }

  return value;
}

// const { isRuleObject } = require("../utils/isRuleObject");

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

// const { isRuleObject } = require("../utils/isRuleObject");

function gteOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length !== 2) {
    throw new Error("$gte operator expects an array with exactly two elements.");
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

function gtOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length !== 2) {
    throw new Error("$gt operator expects an array with exactly two elements.");
  }

  const [left, right] = params.map(p => resolveValue(p, context));
  return left > right;
}

function ltOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length !== 2) {
    throw new Error("$lt operator expects an array with exactly two elements.");
  }

  const [left, right] = params.map(p => resolveValue(p, context));
  return left < right;
}

// const { resolveValue } = require("../utils/resolveValue");

function lteOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length !== 2) {
    throw new Error("$lte operator expects an array with exactly two elements.");
  }

  const [left, right] = params.map(p => resolveValue(p, context));
  return left <= right;
}

// const { resolveValue } = require("../utils/resolveValue");

function neOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length < 2) {
    throw new Error("$ne operator expects an array with at least two elements.");
  }

  const resolvedValues = params.map(p => resolveValue(p, context));
  const first = resolvedValues[0];
  return !resolvedValues.every(v => v === first);
}

// const { isRuleObject } = require("../utils/isRuleObject");

function andOperator(params, context = {}) {
  if (!Array.isArray(params)) {
    throw new Error("$and operator expects an array.");
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

// const { isRuleObject } = require("../utils/isRuleObject");

function inOperator(params, context = {}) {
  if (!Array.isArray(params) || params.length !== 2) {
    throw new Error("$in operator expects an array with exactly two elements.");
  }

  let [value, array] = params;

  if (isRuleObject(value)) {
    value = evaluateRule(value, context);
  } else {
    value = resolveValue(value, context);
  }

  if (isRuleObject(array)) {
    array = evaluateRule(array, context);
  } else {
    array = resolveValue(array, context);
  }

  if (!Array.isArray(array)) {
    throw new Error("$in operator expects second argument to be an array.");
  }

  return array.includes(value);
}

// const { isRuleObject } = require("../utils/isRuleObject");

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

// module.exports = {
//   $eq: require("./eq"),
//   $gte: require("./gte"),
//   $gt: require("./gt"),
//   $lt: require("./lt"),
//   $lte: require("./lte"),
//   $ne: require("./ne"),
//   $and: require("./and"),
//   $in: require("./in"),
//   $or: require("./or"),
// };

var operators = {
  $eq: eqOperator,
  $gte: gteOperator,
  $gt: gtOperator,
  $lt: ltOperator,
  $lte: lteOperator,
  $ne: neOperator,
  $and: andOperator,
  $in: inOperator,
  $or: orOperator,
};

// const operators = require("./operators");

function evaluateRule(rule, context) {
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

// const { evaluateRule } = require("./evaluateRule");

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

export { evaluateRules };

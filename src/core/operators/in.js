// const { isRuleObject } = require("../utils/isRuleObject");
import { isRuleObject } from "../utils/isRuleObject";
// const { resolveValue } = require("../utils/resolveValue");
import { resolveValue } from "../utils/resolveValue";
// const { evaluateRule } = require("../evaluateRule");
import { evaluateRule } from "../evaluateRule";

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

export default inOperator;

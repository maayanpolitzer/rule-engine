import { evaluateRules } from "../../dist/index.esm.js";

const rules = [{ $gt: [5, 3] }, { $eq: [10, 10] }];

console.log(evaluateRules(rules)); // true

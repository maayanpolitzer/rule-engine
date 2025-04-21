import { evaluateRules } from "../../dist/index.esm.js";

const rule = { $gt: [5, 3] };
console.log(evaluateRules(rule)); // true

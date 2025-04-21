import { evaluateRules } from "../../dist/index.esm.js";

const context = {
  user: {
    age: 25,
    name: "Alice",
  },
};

const rules = [
  { $gte: ["{{user.age}}", 18] },
  { $eq: ["{{user.name}}", "Alice"] },
];

console.log(evaluateRules(rules, context)); // true

import { evaluateRules } from "../../dist/index.esm.js";

const context = {
  user: {
    age: 25,
    roles: ["admin", "editor"],
  },
};

const rule = {
  $and: [
    { $gte: ["{{user.age}}", 18] },
    { $in: ["admin", "{{user.roles}}"] },
    { $eq: [{ $eq: [5, 5] }, true] },
  ],
};

console.log(evaluateRules(rule, context)); // true

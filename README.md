# RuleEngine

A lightweight, powerful and flexible rule evaluation engine designed for simple or complex logical operations.  
Perfect for projects requiring customizable validation, dynamic conditions, or decision trees based on json.
inspired by MongoDB filters.
---

## Features

- Built-in operators: `$eq`, `$gt`, `$gte`, `$lt`, `$lte`, `$ne`, `$and`, `$or`, `$in`
- Easy nesting of rules
- Context-aware value resolution
- Zero dependencies
- 100% JavaScript (Node.js)

---

## Installation

```bash
npm install @maayanpolitzer/rules-engine
```

Or clone the github repository for local development.

---

## Usage

```javascript

import { evaluateRules } from "@maayanpolitzer/rules-engine";       // ES Modules
// OR
const { evaluateRules } = require("@maayanpolitzer/rules-engine");  // CommonJS

const context = {
  user: {
    age: 25,
    role: "admin",
  },
};

const rules = [
  { $lt: ["{{user.age}}", 25] },          // false
  { $gte: ["{{user.age}}", 18] },         // true
  { $eq: ["{{user.role}}", "admin"] },    // won't be checked... The top level rules array perform as $OR operations by default.
];

const result = evaluateRules(rules, context);

console.log(result);    // true
```

---

## Supported Operators

| Operator | Description                                  |
| :------- | :------------------------------------------- |
| `$eq`    | Checks if all values are strictly equal      |
| `$gt`    | Checks if first value > second value         |
| `$gte`   | Checks if first value >= second value        |
| `$lt`    | Checks if first value < second value         |
| `$lte`   | Checks if first value <= second value        |
| `$ne`    | Checks if two values are not equal           |
| `$and`   | Returns true if all rules are true           |
| `$or`    | Returns true if at least one rule is true    |
| `$in`    | Checks if a value is inside a provided array |

---

## Want To Use ? You Must Know This:

By default, "evaluateRules" function can get a rule object or a rule objects array as arguments.
In cases of multiple top level rules, the function perform an $OR operation which means that if one of the rules is true, the whole function returns `true`.
If you want to return `true` only if all the top level rules array are true, wrap them with $AND.

---

## Why use $AND over $EQ ?

Clone the Github Repo and run tests/performance/eq-vs-and test or 
```bash
npm run benchmark
```

---

## Important Notes

- **Context Values**: To pull a dynamic value from the context, wrap it in double curly braces:
  Example: "{{user.age}}"
- **Nested Rules**: You can nest rules inside one another for complex logic.
- **Error Handling**: Invalid paths or unsupported operators will throw clear errors.

---

## Development & Testing

Run all tests:

```bash
npm run test
```

Run performance benchmarks:

```bash
npm run benchmark
```

---

## License

MIT License — Free for personal or commercial use.

---

## Contributing

Feel free to open issues or submit pull requests!  
Ideas for new operators, better performance, or features are welcome.

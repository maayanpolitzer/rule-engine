# RuleEngine ✨✨✨

A lightweight, flexible rule evaluation engine designed for simple or complex logical operations. 🌟⚙️🛠️  
Perfect for projects requiring customizable validation, dynamic conditions, or decision trees. 🌳📈🔍

---

## ✨ Features 🎉🌟🚀

- Built-in operators: `$eq`, `$gt`, `$gte`, `$lt`, `$lte`, `$ne`, `$and`, `$or`, `$in`
- Easy nesting of rules
- Context-aware value resolution
- Simple plugin-based architecture for future extensions
- Zero dependencies
- 100% JavaScript (Node.js)

---

## 📦 Installation 📦🔧🚲

```bash
npm install rule-engine-light
```

(Or clone this repository for local development.)

---

## 🚀 Usage 🚀📜🔎

```javascript
const { runRules } = require("rule-engine-light");

const context = {
  user: {
    age: 25,
    role: "admin",
  },
};

const rules = [
  { $gte: ["{{user.age}}", 18] },
  { $eq: ["{{user.role}}", "admin"] },
];

const result = runRules(rules, {
  returnIfTrue: "Access Granted",
  returnIfFalse: "Access Denied",
});

console.log(result); // "Access Granted"
```

---

## 🔧 Supported Operators 🧰📋🛠️

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

## 🧐 Important Notes 📚🧠📢

- **Context Values**: To pull a dynamic value from the context, wrap it in double curly braces:  
  Example: "{{user.age}}"
- **Nested Rules**: You can nest rules inside one another for complex logic.
- **Error Handling**: Invalid paths or unsupported operators will throw clear errors.

---

## 🛠️ Development & Testing 🧪🛠️🔬

Run all tests:

```bash
npm run test
```

Run performance benchmarks:

```bash
npm run benchmark
```

---

## 📔 License 🗜️🌃🎉

MIT License — Free for personal or commercial use.

---

## 🤝 Contributing 🤝💬📈

Feel free to open issues or submit pull requests!  
Ideas for new operators, better performance, or features are welcome.

---

## ❤️ Special Thanks 🎉🙏🌟

Thanks to the open-source community for inspiring this lightweight and powerful engine! 🚀🌍🛠️

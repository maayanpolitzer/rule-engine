import { evaluateRules } from "../../dist/index.esm.js";

describe("$lt Operator", () => {
  it("should return true when left < right", () => {
    const rules = [{ $lt: [5, 10] }];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should return false when left >= right", () => {
    const rules = [{ $lt: [10, 5] }];
    expect(evaluateRules(rules)).toBe(false);
  });

  it("should handle context values", () => {
    const context = { user: { score: 20 } };
    const rules = [{ $lt: ["{{user.score}}", 100] }];
    expect(evaluateRules(rules, context)).toBe(true);
  });

  it("should throw error if not exactly two elements", () => {
    const rules = [{ $lt: [5] }];
    expect(() => evaluateRules(rules)).toThrow();
  });

  it("should correctly handle nested rules inside $lt", () => {
    const rules = [
      {
        $lt: [
          { $eq: [5, 5] }, // true -> 1
          { $gte: [2, 1] }, // true -> 1
        ],
      },
    ];
    expect(evaluateRules(rules)).toBe(false);
  });
});

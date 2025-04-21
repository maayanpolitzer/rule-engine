import { evaluateRules } from "../../dist/index.esm.js";

describe("$gte Operator", () => {
  it("should return true if first number is greater than second", () => {
    const rules = [{ $gte: [10, 5] }];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should return true if both numbers are equal", () => {
    const rules = [{ $gte: [5, 5] }];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should return false if first number is smaller than second", () => {
    const rules = [{ $gte: [3, 5] }];
    expect(evaluateRules(rules)).toBe(false);
  });

  it("should throw error if array length is not 2", () => {
    const rules = [{ $gte: [5] }];
    expect(() => evaluateRules(rules)).toThrow(
      "$gte operator expects an array with exactly two elements."
    );
  });

  it("should handle nested rules", () => {
    const rules = [
      {
        $gte: [
          { $eq: [5, 5] }, // 5 === 5 -> true (as 1 when compared)
          1,
        ],
      },
    ];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should handle context values", () => {
    const rules = [
      {
        $gte: ["{{user.age}}", 18],
      },
    ];
    const context = {
      user: { age: 21 },
    };
    expect(evaluateRules(rules, context)).toBe(true);
  });
});

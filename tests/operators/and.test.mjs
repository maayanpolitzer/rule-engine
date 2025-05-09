import { evaluateRules } from "../../dist/index.esm.js";

describe("$and Operator", () => {
  it("should return true if all values are truthy", () => {
    const rules = [{ $and: [true, 1, "hello", []] }];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should return false if any value is falsy", () => {
    const rules = [{ $and: [true, 0, "hello"] }];
    expect(evaluateRules(rules)).toBe(false);
  });

  it("should correctly evaluate nested rules", () => {
    const rules = [
      {
        $and: [{ $eq: [5, 5] }, { $gte: [10, 5] }],
      },
    ];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should return false if nested rule is false", () => {
    const rules = [
      {
        $and: [{ $eq: [5, 6] }, { $gte: [10, 5] }],
      },
    ];
    expect(evaluateRules(rules)).toBe(false);
  });

  it("should throw error if input is not an array", () => {
    const rules = [{ $and: true }];
    expect(() => evaluateRules(rules)).toThrow(
      "$and operator expects an array."
    );
  });

  it("should handle context values correctly", () => {
    const context = { user: { active: true, verified: true } };
    const rules = [
      {
        $and: ["{{user.active}}", "{{user.verified}}"],
      },
    ];
    expect(evaluateRules(rules, context)).toBe(true);
  });

  it("should fail if a context value is falsy", () => {
    const context = { user: { active: true, verified: false } };
    const rules = [
      {
        $and: ["{{user.active}}", "{{user.verified}}"],
      },
    ];
    expect(evaluateRules(rules, context)).toBe(false);
  });
});

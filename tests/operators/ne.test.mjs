import { evaluateRules } from "../../dist/index.esm.js";

describe("$ne Operator", () => {
  it("should return true if values are not equal", () => {
    const rules = [{ $ne: [5, 10] }];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should return false if all values are equal", () => {
    const rules = [{ $ne: [5, 5, 5] }];
    expect(evaluateRules(rules)).toBe(false);
  });

  it("should handle context values", () => {
    const context = { user: { id: "1234" } };
    const rules = [{ $ne: ["{{user.id}}", "5678"] }];
    expect(evaluateRules(rules, context)).toBe(true);
  });

  it("should throw error if less than two values provided", () => {
    const rules = [{ $ne: [5] }];
    expect(() => evaluateRules(rules)).toThrow();
  });

  it("should correctly evaluate nested rules inside $ne", () => {
    const rules = [
      {
        $ne: [
          { $eq: [5, 5] }, // true -> 1
          { $gte: [5, 5] }, // true -> 1
        ],
      },
    ];
    expect(evaluateRules(rules)).toBe(false);
  });
});

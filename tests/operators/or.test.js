const { runRules } = require("../../src");

describe("$or Operator", () => {
  it("should return true if at least one condition is true", () => {
    const rules = [{ $or: [false, true, false] }];
    expect(runRules(rules)).toBe(true);
  });

  it("should return false if all conditions are false", () => {
    const rules = [{ $or: [false, false, false] }];
    expect(runRules(rules)).toBe(false);
  });

  it("should support context values", () => {
    const context = { user: { isActive: true } };
    const rules = [{ $or: [false, "{{user.isActive}}"] }];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should handle nested rules", () => {
    const rules = [
      {
        $or: [{ $eq: [5, 6] }, { $eq: [10, 10] }],
      },
    ];
    expect(runRules(rules)).toBe(true);
  });

  it("should throw if params is not an array", () => {
    const rules = [{ $or: "not-an-array" }];
    expect(() => runRules(rules)).toThrow("$or operator expects an array.");
  });

  it("should handle deeply nested $or", () => {
    const rules = [
      {
        $or: [false, { $or: [false, { $or: [false, true] }] }],
      },
    ];
    expect(runRules(rules)).toBe(true);
  });
});

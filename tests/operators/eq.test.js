const { runRules } = require("../../src");

describe("$eq Operator - Updated Behavior", () => {
  it("should return true for two equal primitive values", () => {
    const rules = [{ $eq: [5, 5] }];
    expect(runRules(rules)).toBe(true);
  });

  it("should return false for two different primitive values", () => {
    const rules = [{ $eq: [5, 6] }];
    expect(runRules(rules)).toBe(false);
  });

  it("should return true for multiple equal values", () => {
    const rules = [{ $eq: [5, 5, 5, 5] }];
    expect(runRules(rules)).toBe(true);
  });

  it("should return false for multiple values with one different", () => {
    const rules = [{ $eq: [5, 5, 6, 5] }];
    expect(runRules(rules)).toBe(false);
  });

  it("should correctly evaluate nested rules inside $eq", () => {
    const rules = [{
      $eq: [{ $eq: [5, 5] }, { $eq: [10, 10] }],
    }];
    expect(runRules(rules)).toBe(true);
  });

  it("should throw an error if less than two values provided", () => {
    const rules = [{ $eq: [5] }];
    expect(() => runRules(rules)).toThrow(
      "$eq operator expects an array with at least two elements."
    );
  });

  it("should handle context values", () => {
    const rules = [{ $eq: ["{{user.age}}", 30] }];

    const context = {
      user: {
        age: 30,
      },
    };
    expect(runRules(rules, {}, context)).toBe(true);
  });
});

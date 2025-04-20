const { runRules } = require("../../src");

describe("$lt Operator", () => {
  it("should return true when left < right", () => {
    const rules = [{ $lt: [5, 10] }];
    expect(runRules(rules)).toBe(true);
  });

  it("should return false when left >= right", () => {
    const rules = [{ $lt: [10, 5] }];
    expect(runRules(rules)).toBe(false);
  });

  it("should handle context values", () => {
    const context = { user: { score: 20 } };
    const rules = [{ $lt: ["{{user.score}}", 100] }];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should throw error if not exactly two elements", () => {
    const rules = [{ $lt: [5] }];
    expect(() => runRules(rules)).toThrow();
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
    expect(runRules(rules)).toBe(false);
  });
});

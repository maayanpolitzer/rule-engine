const { runRules } = require("../../src");

describe("$gt Operator", () => {
  it("should return true when left > right", () => {
    const rules = [{ $gt: [10, 5] }];
    expect(runRules(rules)).toBe(true);
  });

  it("should return false when left <= right", () => {
    const rules = [{ $gt: [5, 10] }];
    expect(runRules(rules)).toBe(false);
  });

  it("should handle values from context", () => {
    const context = { user: { age: 25 } };
    const rules = [{ $gt: ["{{user.age}}", 18] }];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should throw error if not exactly two elements", () => {
    const rules = [{ $gt: [5] }];
    expect(() => runRules(rules)).toThrow();
  });

  it("should correctly evaluate nested rules inside $gt", () => {
    const rules = [
      {
        $gt: [
          { $gte: [10, 5] }, // true -> 1
          { $eq: [true, false] }, // false -> 0
        ],
      },
    ];
    expect(runRules(rules)).toBe(true);
  });
});

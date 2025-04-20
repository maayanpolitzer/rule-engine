const { runRules } = require("../../src");

describe("Complex Rule Scenarios", () => {
  it("should evaluate multiple rules with context values", () => {
    const context = { user: { age: 30, score: 85 } };
    const rules = [
      { $gt: ["{{user.age}}", 18] },
      { $lt: ["{{user.score}}", 100] },
      { $eq: [5, 5, 5] },
    ];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should fail if one rule fails", () => {
    const context = { user: { age: 16, score: 85 } };
    const rules = [
      { $gt: ["{{user.age}}", 18] }, // false
      { $lt: ["{{user.score}}", 100] }, // true
      { $eq: [5, 5, 5] }, // true
    ];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should fail because the last inernal rule is false, and the wrapper rule is $eq", () => {
    const context = { user: { age: 16, score: 85 } };
    const rules = [
      {
        $eq: [
          { $lt: ["{{user.score}}", 100] }, // true
          { $eq: [5, 5, 5] }, // true
          { $gt: ["{{user.age}}", 18] }, // false
        ],
      },
    ];
    expect(runRules(rules, {}, context)).toBe(false);
  });

  it("should correctly handle nested rules inside rules", () => {
    const context = { user: { age: 20, score: 50 } };
    const rules = [
      {
        $eq: [
          { $gt: ["{{user.age}}", 18] }, // true
          { $lt: ["{{user.score}}", 100] }, // true
        ],
      },
    ];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should handle very deep nesting of rules", () => {
    const context = { user: { points: 500 } };
    const rules = [
      {
        $eq: [
          {
            $eq: [
              { $gte: ["{{user.points}}", 300] }, // true
              { $gt: [500, 100] }, // true
            ],
          },
          true,
        ],
      },
    ];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should throw if accessing invalid context path", () => {
    const context = { user: { name: "John" } };
    const rules = [
      { $gt: ["{{user.age}}", 18] }, // user.age לא קיים
    ];
    expect(() => runRules(rules, {}, context)).toThrow(
      'Path "user.age" does not exist in context.'
    );
  });

  it("should return correct custom returnIfTrue and returnIfFalse", () => {
    const rules = [
      {
        $eq: [5, 5],
      },
    ];
    expect(
      runRules(rules, { returnIfTrue: "VALID", returnIfFalse: "INVALID" })
    ).toBe("VALID");
  });

  it("should evaluate mix of static and context values", () => {
    const context = { order: { amount: 150 } };
    const rules = [
      { $gte: ["{{order.amount}}", 100] },
      { $lt: ["{{order.amount}}", 200] },
    ];
    expect(runRules(rules, {}, context)).toBe(true);
  });
});

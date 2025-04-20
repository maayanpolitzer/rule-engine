const { runRules } = require("../src");

describe("RuleEngine", () => {
  it("should return true when first rule passes", () => {
    const rules = [
      { $eq: [5, 5] }, // זה יעבור
      { $eq: [1, 2] }, // לא נגיע אליו
    ];
    const context = {};
    const result = runRules(rules,{}, context);
    expect(result).toBe(true);
  });

  it("should return false when no rules pass", () => {
    const rules = [{ $eq: [1, 2] }, { $eq: [3, 4] }];
    const context = {};
    const result = runRules(rules,{}, context);
    expect(result).toBe(false);
  });

  it("should return custom returnIfTrue and returnIfFalse values", () => {
    const rules = [{ $eq: [5, 5] }];
    const context = {};
    const result = runRules(
      rules,
      {
        returnIfTrue: "GRANTED",
        returnIfFalse: "DENIED",
      },
      context
    );
    expect(result).toBe("GRANTED");
  });
});

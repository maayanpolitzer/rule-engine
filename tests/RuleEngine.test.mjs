import { evaluateRules } from "../dist/index.esm.js";

describe("RuleEngine", () => {
  it("should return true when first rule passes", () => {
    const rules = [{ $eq: [5, 5] }, { $eq: [1, 2] }];
    const context = {};
    const result = evaluateRules(rules, context);
    expect(result).toBe(true);
  });

  it("should return false when no rules pass", () => {
    const rules = [{ $eq: [1, 2] }, { $eq: [3, 4] }];
    const context = {};
    const result = evaluateRules(rules, context);
    expect(result).toBe(false);
  });
});

// import { evaluateRules } from "../../dist/index.esm.js";
import { evaluateRules } from "../../dist/index.esm.js";

describe("$lte Operator", () => {
  it("should return true when left <= right", () => {
    const rules = [{ $lte: [5, 5] }];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should return true when left < right", () => {
    const rules = [{ $lte: [5, 10] }];
    expect(evaluateRules(rules)).toBe(true);
  });

  it("should return false when left > right", () => {
    const rules = [{ $lte: [10, 5] }];
    expect(evaluateRules(rules)).toBe(false);
  });

  it("should handle nested rules", () => {
    const rules = [
      {
        $lte: [
          { $gte: [10, 10] }, // true -> 1
          { $eq: [true, true] }, // true -> 1
        ],
      },
    ];
    expect(evaluateRules(rules)).toBe(true);
  });
});

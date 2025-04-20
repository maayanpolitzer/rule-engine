const { runRules } = require("../../src");

describe("$in Operator", () => {
  it("should return true if value exists in array", () => {
    const rules = [{ $in: [5, [1, 2, 3, 5]] }];
    expect(runRules(rules)).toBe(true);
  });

  it("should return false if value does not exist in array", () => {
    const rules = [{ $in: [7, [1, 2, 3, 5]] }];
    expect(runRules(rules)).toBe(false);
  });

  it("should support context values", () => {
    const context = { user: { id: 5 } };
    const rules = [{ $in: ["{{user.id}}", [1, 2, 3, 5]] }];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should support context values not in array", () => {
    const context = { student: { grades: [90, 82, 94] } };
    const rules = [{ $in: [83, "{{student.grades}}"] }];
    expect(runRules(rules, {}, context)).toBe(false);
  });

  it("should support context values in array", () => {
    const context = { student: { grades: [90, 82, 94] } };
    const rules = [{ $in: [82, "{{student.grades}}"] }];
    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should handle nested rules", () => {
    const rules = [
      {
        $in: [{ $eq: [5, 5] }, [true, false]],
      },
    ];
    expect(runRules(rules)).toBe(true);
  });

  it("should throw if second parameter is not array", () => {
    const rules = [{ $in: [5, 234] }];
    expect(() => runRules(rules)).toThrow(
      "$in operator expects second argument to be an array."
    );
  });

  it("should throw if params length is not 2", () => {
    const rules = [{ $in: [5] }];
    expect(() => runRules(rules)).toThrow(
      "$in operator expects an array with exactly two elements."
    );
  });
});

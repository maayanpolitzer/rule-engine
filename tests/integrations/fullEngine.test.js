const { runRules } = require("../../src/index");

describe("Full Engine Integration Test", () => {
  const context = {
    user: {
      age: 30,
      isActive: true,
      roles: ["admin", "editor"],
      country: "US",
      score: 95,
    },
    product: {
      stock: 5,
      price: 100,
    },
  };

  it("should correctly evaluate complex nested rules", () => {
    const rules = [
      { $eq: [6, 6] }, // true
      { $gte: [10, 5] }, // true
      { $lte: [100, 200] }, // true
      { $gt: [5, 3] }, // true
      { $lt: [5, 10] }, // true
      { $in: ["{{user.country}}", ["US", "CA"]] }, // true (US in array)
      { $or: [false, { $eq: ["{{user.age}}", 30] }] }, // true (user age is 30)
      { $and: [true, { $gte: ["{{user.score}}", 90] }] }, // true (score 95 >= 90)
      { $eq: [{ $gt: ["{{product.stock}}", 0] }, true] }, // true (stock > 0)
    ];

    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should correctly evaluate complex nested rules - only last rule is true", () => {
    const rules = [
      { $eq: [6, 8] },
      { $gte: [10, 50] },
      { $lte: [300, 200] },
      { $gt: [5, 13] },
      { $lt: [51, 10] },
      { $in: ["{{user.country}}", ["RO", "CA"]] },
      { $or: [false, { $eq: ["{{user.age}}", 31] }] },
      { $and: [true, { $gte: ["{{user.score}}", 100] }] },
      { $eq: [{ $gt: ["{{product.stock}}", 10] }, false] },
    ];

    expect(runRules(rules, {}, context)).toBe(true);
  });

  it("should return false if any top-level rule fails", () => {
    const rules = [
      {
        $and: [
          { $eq: [4, 4] },
          { $gte: [10, 5] },
          { $lte: [100, 200] },
          { $gt: [5, 3] },
          { $lt: [5, 10] },
          { $in: ["{{user.country}}", ["US", "CA"]] },
          { $or: [false, { $eq: ["{{user.age}}", 30] }] },
          { $and: [true, { $gte: ["{{user.score}}", 90] }] },
          {
            $eq: [{ $gt: ["{{product.stock}}", 10] }, true],
          },
        ],
      },
    ];

    expect(runRules(rules, {}, context)).toBe(false);
  });
});

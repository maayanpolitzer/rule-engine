import { evaluateRules } from "../../dist/index.esm.js";

describe("Performance comparison between similar rules", () => {
  const ITERATIONS = 10000;
  const context = { user: { age: 30 } };

  const rulePairs = [
    {
      description: "$lte 5,4 vs $gt 5,6",
      rule1: { $lte: [5, 4] },
      rule2: { $gt: [5, 6] },
    },
    {
      description: "$gte 5,5 vs $eq 5,5",
      rule1: { $gte: [5, 5] },
      rule2: { $eq: [5, 5] },
    },
    {
      description: "$lt 3,10 vs $lte 3,10",
      rule1: { $lt: [3, 10] },
      rule2: { $lte: [3, 10] },
    },
    {
      description: "$ne 5,4 vs $gt 5,4",
      rule1: { $ne: [5, 4] },
      rule2: { $gt: [5, 4] },
    },
    {
      description: "$eq 1,1,1 vs $and of $eq",
      rule1: { $eq: [1, 1, 1] },
      rule2: { $and: [{ $eq: [1, 1] }, { $eq: [1, 1] }] },
    },
  ];

  rulePairs.forEach(({ description, rule1, rule2 }) => {
    it(`should have the same result and compare performance for: ${description}`, () => {
      let result1, result2;

      // Measure rule1
      const start1 = performance.now();
      for (let i = 0; i < ITERATIONS; i++) {
        result1 = evaluateRules([rule1], {}, context);
      }
      const end1 = performance.now();

      // Measure rule2
      const start2 = performance.now();
      for (let i = 0; i < ITERATIONS; i++) {
        result2 = evaluateRules([rule2], {}, context);
      }
      const end2 = performance.now();

      const time1 = (end1 - start1).toFixed(2);
      const time2 = (end2 - start2).toFixed(2);

      console.log(`\nPerformance for ${description}:`);
      console.log(`Rule1 took ${time1}ms`);
      console.log(`Rule2 took ${time2}ms`);
      console.log(`Winner: ${time1 < time2 ? "Rule1" : "Rule2"} 🚀`);

      expect(result1).toBe(result2);
    });
  });
});

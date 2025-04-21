import { evaluateRules } from "../../dist/index.esm.js";

describe("Performance Test - $eq vs $and", () => {
  const context = {
    user: { age: 30, active: true, verified: true },
    profile: { complete: true },
    settings: { enabled: true },
  };

  const rulesArray = [
    true,
    "{{user.active}}",
    "{{user.verified}}",
    "{{profile.complete}}",
    "{{settings.enabled}}",
    true,
  ];

  const ruleUsingEq = [
    {
      $eq: [...rulesArray],
    },
  ];

  const ruleUsingAnd = [
    {
      $and: [...rulesArray],
    },
  ];

  function measurePerformance(fn) {
    const start = performance.now();
    fn();
    const end = performance.now();
    return end - start;
  }

  it("should compare $eq and $and performance", () => {
    const eqTime = measurePerformance(() => {
      for (let i = 0; i < 10000; i++) {
        evaluateRules(ruleUsingEq, context);
      }
    });

    const andTime = measurePerformance(() => {
      for (let i = 0; i < 10000; i++) {
        evaluateRules(ruleUsingAnd, context);
      }
    });

    console.log(`$eq time: ${eqTime.toFixed(2)} ms`);
    console.log(`$and time: ${andTime.toFixed(2)} ms`);

    // פשוט לוודא ששניהם באמת עבדו
    expect(evaluateRules(ruleUsingEq, context)).toBe(true);
    expect(evaluateRules(ruleUsingAnd, context)).toBe(true);

    // אפשר גם לבדוק אם and יותר מהיר (לא חובה כי זה תלוי מכונה, אבל בשביל הניסוי)
    expect(andTime).toBeLessThanOrEqual(eqTime);
  });
});

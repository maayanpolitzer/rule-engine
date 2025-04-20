function isRuleObject(obj) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Object.keys(obj).length === 1 &&
    Object.keys(obj)[0].startsWith("$")
  );
}

module.exports = { isRuleObject };

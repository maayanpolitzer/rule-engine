function resolveValue(value, context) {
  if (typeof value === "string") {
    const match = value.match(/^{{(.*?)}}$/);

    if (match) {
      const path = match[1].trim();
      const parts = path.split(".");

      let result = context;
      for (const part of parts) {
        if (result == null || !(part in result)) {
          throw new Error(`Path "${path}" does not exist in context.`);
        }
        result = result[part];
      }
      return result;
    }
  }

  return value;
}

// module.exports = {
//   resolveValue,
// };

export { resolveValue };

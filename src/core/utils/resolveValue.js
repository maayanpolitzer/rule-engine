function resolveValue(value, context) {
  // אם value הוא string
  if (typeof value === "string") {
    const match = value.match(/^{{(.*?)}}$/); // מנסה למצוא מחרוזת בתבנית {{...}}
    
    if (match) {
      const path = match[1].trim(); // חותך את ה-{{...}}
      const parts = path.split("."); // מפרק את ה-path

      let result = context;
      for (const part of parts) {
        if (result == null || !(part in result)) {
          throw new Error(`Path "${path}" does not exist in context.`);
        }
        result = result[part]; // עובר על המידע בקונטקסט
      }
      return result;
    }
  }

  return value; // אם value לא היה string מתאים, מחזירים אותו כמו שהוא
}


module.exports = {
  resolveValue,
};

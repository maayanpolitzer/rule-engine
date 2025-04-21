import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js", // קובץ הכניסה הראשי שלך
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs", // CommonJS ל- require
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm", // ESM ל-import
      sourcemap: true,
    },
    {
      file: "dist/index.min.js",
      format: "iife", // דחוס לשימוש ישיר בדפדפן
      name: "RuleEngine",
      plugins: [terser()],
    },
  ],
  plugins: [resolve(), commonjs()],
};

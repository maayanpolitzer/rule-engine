import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const input = "src/index.js";

export default [
  // CommonJS
  {
    input,
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
        exports: "named", // בשביל תמיכה נוחה ב-require
        sourcemap: false,
      },
      {
        file: "dist/index.min.cjs",
        format: "cjs",
        exports: "named",
        plugins: [terser()],
        sourcemap: false,
      },
    ],
    external: [], // אפשר לפרט כאן תלויות חיצוניות בעתיד
    plugins: [resolve(), commonjs()],
  },

  // ESModule
  {
    input,
    output: [
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: false,
      },
      {
        file: "dist/index.min.esm.js",
        format: "esm",
        plugins: [terser()],
        sourcemap: false,
      },
    ],
    external: [],
    plugins: [resolve(), commonjs()],
  },
];

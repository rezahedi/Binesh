import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Next.js recommended rules
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "drizzle/**",
  ]),

  // Prettier integration
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: { prettier: prettierPlugin },
    rules: {
      ...prettierConfig.rules, // Disable conflicting ESLint rules
      "prettier/prettier": "error", // Treat Prettier formatting issues as ESLint errors
    },
  },
]);

export default eslintConfig;

import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactPerf from "eslint-plugin-react-perf";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/!(_)*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-perf": reactPerf,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactPerf.configs.recommended.rules,
    },
  }
);

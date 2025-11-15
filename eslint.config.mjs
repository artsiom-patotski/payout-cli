import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig(
  globalIgnores(["**/coverage/**", "**/dist/**", "**/node_modules/**"]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier
);

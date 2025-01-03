import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: "inline",
  dts: true,
  clean: true,
  format: ["esm"],
  external: ["react"],
});

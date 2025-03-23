import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
      include: [
        "src/**/components/**",
        "src/**/hooks/**",
        "src/**/pages/**",
        "src/**/ui/**",
        "src/**/utils/**",
      ],
    },
    include: ["src/**/*.spec.{ts,tsx}"],
    setupFiles: "./vitest.setup.ts",
  },
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
      include: [
        "src/**/*.component.*",
        "src/**/*.hook.*",
        "src/**/*.service.*",
        "src/**/*.utils.*",
      ],
      exclude: ["src/presentation/routing/**"],
    },
    include: ["src/**/*.spec.{ts,tsx}"],
    setupFiles: "./vitest.setup.ts",
  },
});

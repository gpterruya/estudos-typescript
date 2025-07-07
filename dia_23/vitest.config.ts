import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,  // permite usar `describe`, `it`, etc globalmente
    environment: "node",
    include: ["apps/**/*.{test,spec}.{ts,tsx}", "packages/**/*.{test,spec}.{ts,tsx}"],
    // Configura paths para os tipos compartilhados (caso use path aliases)
    // você pode precisar de plugins se usar paths complexos
  },
});

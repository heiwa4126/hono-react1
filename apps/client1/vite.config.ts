/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@shared": path.resolve(__dirname, "../../packages/shared/src"),
		},
	},
	test: {
		globals: true,
		environment: "node",
		coverage: {
			reporter: ["lcov", "json", "text"],
		},
	},
});

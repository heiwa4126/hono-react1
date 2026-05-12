import { defineConfig } from "tsdown";

function fixCjsExtension({ format }: { format: string }) {
	if (format === "cjs") return { js: ".cjs" };
	return { js: ".js" };
}

export default defineConfig([
	{
		// ex1 (ESM only)
		clean: false,
		entry: ["src/ex*.ts"],
		format: ["esm"],
		outDir: "dist",
		unbundle: false,
		sourcemap: false,
		minify: false,
		dts: false,
		outExtensions: fixCjsExtension,
	},
]);

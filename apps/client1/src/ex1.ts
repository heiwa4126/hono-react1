import { type AppType } from "@shared/app";
import { hc, type InferResponseType } from "hono/client";

const client = hc<AppType>("http://localhost:3000");

async function main(): Promise<void> {
	const response = await client.hello.$get();

	if (!response.ok) {
		throw new Error(`Request failed: ${response.status} ${response.statusText}`);
	}

	const body: InferResponseType<typeof client.hello.$get> = await response.json();
	console.log(body.message);
}

main().catch((error: unknown) => {
	console.error("Failed to fetch /hello:", error);
	process.exitCode = 1;
});

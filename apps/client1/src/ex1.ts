import { type InferResponseType } from "hono/client";
import { client } from "./client.js";

const helloGet = client.hello.$get;

async function main(): Promise<void> {
	const response = await helloGet();

	if (!response.ok) {
		throw new Error(`Request failed: ${response.status} ${response.statusText}`);
	}

	const body: InferResponseType<typeof helloGet> = await response.json();
	console.log(body.message);
}

main().catch((error: unknown) => {
	console.error("Failed to fetch /hello:", error);
	process.exitCode = 1;
});

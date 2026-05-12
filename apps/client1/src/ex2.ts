import { GoodbyeResponseType } from "@shared/app";
import { client } from "./client.js";

async function main(): Promise<void> {
	const response = await client.goodbye.$get();

	if (!response.ok) {
		throw new Error(`Request failed: ${response.status} ${response.statusText}`);
	}

	const body = GoodbyeResponseType.parse(await response.json());
	console.log(body.message);
}

main().catch((error: unknown) => {
	console.error("Failed to fetch /goodbye:", error);
	process.exitCode = 1;
});

const API_URL = "http://localhost:3000/hello";

async function main(): Promise<void> {
	const response = await fetch(API_URL);

	if (!response.ok) {
		throw new Error(`Request failed: ${response.status} ${response.statusText}`);
	}

	const body = await response.text();
	console.log(body);
}

main().catch((error: unknown) => {
	console.error("Failed to fetch /hello:", error);
	process.exitCode = 1;
});

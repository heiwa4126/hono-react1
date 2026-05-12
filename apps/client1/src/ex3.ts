import { GetUserNotFoundResponseType, GetUserSuccessResponseType } from "@shared/app";
import { client } from "./client.js";

async function getUser(id: string): Promise<void> {
	const response = await client.users[":id"].$get({ param: { id } });

	if (response.status === 404) {
		const body = GetUserNotFoundResponseType.parse(await response.json());
		console.log(`User ID ${id} ${body.error}`);
		return;
	}

	if (!response.ok) {
		throw new Error(`Request failed: ${response.status} ${response.statusText}`);
	}

	const body = GetUserSuccessResponseType.parse(await response.json());
	console.log(body.user);
}

const errorTrap = (error: unknown) => {
	console.error("Failed to fetch /users/:id:", error);
	process.exitCode = 1;
};

getUser("0").catch(errorTrap); // サービス利用不可のエラーを返す。exit code は 1。中断はしない
getUser("3").catch(errorTrap); // 存在しないユーザーIDなので、not found エラーを返す
getUser("2").catch(errorTrap);
getUser("1").catch(errorTrap);

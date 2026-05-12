import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const GoodbyeResponseType = z.object({
	message: z.string(),
});
type GoodbyeResponse = z.infer<typeof GoodbyeResponseType>;

const IdSchema = z.object({
	id: z.string(),
});

const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const GetUserSuccessResponseType = z.object({
	user: UserSchema,
});
type GetUserSuccessResponse = z.infer<typeof GetUserSuccessResponseType>;

export const GetUserNotFoundResponseType = z.object({
	error: z.literal("not found"),
});
type GetUserNotFoundResponse = z.infer<typeof GetUserNotFoundResponseType>;

function findUser(id: string) {
	// ここではダミーのユーザーデータを返すだけにします
	const users = [
		{ id: "1", name: "Alice" },
		{ id: "2", name: "Bob" },
	];
	return users.find((user) => user.id === id) || null;
}

const app = new Hono()
	.get("/hello", (c) => {
		return c.json({
			message: "hello",
		});
	})
	.get("/goodbye", (c) => {
		return c.json({
			message: "goodbye", // たとえばここを 1 などの数字にしてみると、クライアント側で型エラーになるはず
		} satisfies GoodbyeResponse);
	})
	.get("/users/:id", zValidator("param", IdSchema), (c) => {
		const { id } = c.req.valid("param");

		// クライアントのテスト用。IDが "0" のときはサービス利用不可のエラーを返す
		if (id === "0") {
			return c.json({ error: "service unavailable" }, 503);
		}

		const user = findUser(id);
		if (!user) {
			return c.json(
				{
					error: "not found",
				} satisfies GetUserNotFoundResponse,
				404,
			);
		}
		return c.json(
			{
				user,
			} satisfies GetUserSuccessResponse,
			200,
		);
	});

export type AppType = typeof app;
export default app;

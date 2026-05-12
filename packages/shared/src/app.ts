import { Hono } from "hono";
import { z } from "zod";

export const GoodbyeResponseType = z.object({
	message: z.string(),
});
type GoodbyeResponse = z.infer<typeof GoodbyeResponseType>;

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
	});

export type AppType = typeof app;
export default app;

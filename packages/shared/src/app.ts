import { Hono } from "hono";

const app = new Hono();

app.get("/hello", (c) => {
	return c.json({
		message: "hello",
	});
});

export type AppType = typeof app;
export default app;

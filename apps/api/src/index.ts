import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/hello", (c) => {
	return c.json({
		message: "hello",
	});
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);

export type AppType = typeof app;
export default app;

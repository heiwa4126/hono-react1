import { type AppType } from "@shared/app";
import { hc } from "hono/client";

export const client = hc<AppType>("http://localhost:3000");

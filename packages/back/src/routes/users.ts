import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { deleteCookie } from "hono/cookie";
import { db } from "../db/connection.js";
import { users } from "../db/schema.js";
import { type AuthEnv, authMiddleware } from "../middleware/auth.js";

export const usersRoutes = new Hono<AuthEnv>();

usersRoutes.use("*", authMiddleware);

usersRoutes.get("/profile", (c) => {
	const user = c.get("user");
	return c.json({
		id: user.id,
		stravaId: user.stravaId,
		username: user.username,
		firstname: user.firstname,
		lastname: user.lastname,
		avatarUrl: user.avatarUrl,
	});
});

usersRoutes.delete("/", async (c) => {
	const user = c.get("user");
	await db.delete(users).where(eq(users.id, user.id));
	deleteCookie(c, "session_id", { path: "/" });
	return c.json({ success: true });
});

import { Hono } from "hono";
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

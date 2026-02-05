import { eq } from "drizzle-orm";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { db } from "../db/connection.js";
import { sessions, users } from "../db/schema.js";

export type AuthUser = {
	id: number;
	stravaId: number;
	username: string | null;
	firstname: string | null;
	lastname: string | null;
	avatarUrl: string | null;
	accessToken: string | null;
	refreshToken: string | null;
	tokenExpiresAt: Date | null;
};

export type AuthEnv = {
	Variables: {
		user: AuthUser;
	};
};

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
	const sessionId = getCookie(c, "session_id");
	if (!sessionId) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const result = await db
		.select()
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, sessionId))
		.limit(1);

	if (result.length === 0) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const session = result[0].sessions;
	const user = result[0].users;

	if (new Date(session.expiresAt) < new Date()) {
		await db.delete(sessions).where(eq(sessions.id, sessionId));
		return c.json({ error: "Session expired" }, 401);
	}

	c.set("user", user as AuthUser);
	await next();
});

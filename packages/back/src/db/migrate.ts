import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./connection.js";

export async function runMigrations() {
	console.log("Running database migrations...");
	await migrate(db, { migrationsFolder: "./src/db/migrations" });
	console.log("Migrations completed.");
}

import { defineConfig } from "drizzle-kit";
import { postgresConnection } from "@/database";

export default defineConfig({
	dialect: "postgresql",
	schema: "./database/schema/**/*.ts",
	out: "./database/migrations",
	dbCredentials: postgresConnection
});

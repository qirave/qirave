import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").notNull().unique(),
	password: text("password"),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image").default("/imgs/avatar.bmp"),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow().$onUpdateFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export default users;

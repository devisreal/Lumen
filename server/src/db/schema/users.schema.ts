import * as t from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userRoleEnum = t.pgEnum("user_role", [
  "user",
  "admin",
  "moderator",
]);

export const users = t.pgTable(
  "users",
  {
    id: t.serial("id").primaryKey(),
    userName: t.varchar("username", { length: 255 }).notNull().unique(),
    firstName: t.varchar("first_name", { length: 255 }),
    lastName: t.varchar("last_name", { length: 255 }),
    email: t.varchar({ length: 255 }).notNull().unique(),
    password: t.varchar("password", { length: 255 }).notNull(),
    phone: t.varchar("phone", { length: 256 }),
    created_at: t.timestamp().defaultNow().notNull(),
    updated_at: t.timestamp().notNull(),
    slug: t.varchar().notNull().unique(),
    role: userRoleEnum("role").notNull().default("user"),
  },
  (table) => [
    t.uniqueIndex("username_idx").on(table.userName),
    t.uniqueIndex("slug_idx").on(table.slug),
    t.uniqueIndex("email_idx").on(table.email),
    t.uniqueIndex("created_idx").on(table.created_at),
  ],
);

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users);

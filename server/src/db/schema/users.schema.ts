import * as t from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userRoleEnum = t.pgEnum("user_role", [
  "user",
  "admin",
  "moderator",
]);

export const userStatusEnum = t.pgEnum("user_status", [
  "active",
  "banned",
  "suspended",
  "deactivated",
]);

export const users = t.pgTable(
  "users",
  {
    id: t.serial("id").primaryKey(),
    username: t.varchar("username", { length: 255 }).notNull().unique(),
    firstname: t.varchar("first_name", { length: 255 }),
    lastname: t.varchar("last_name", { length: 255 }),
    email: t.varchar({ length: 255 }).notNull().unique(),
    password: t.varchar("password", { length: 255 }).notNull(),
    phone: t.varchar("phone", { length: 256 }),
    slug: t.varchar().notNull().unique(),
    role: userRoleEnum("role").notNull().default("user"),
    status: userStatusEnum("status").notNull().default("active"),
    created_at: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: t.timestamp({ withTimezone: true }).notNull(),
    deleted_at: t.timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [
    t.uniqueIndex("user_username_idx").on(table.username),
    t.uniqueIndex("user_slug_idx").on(table.slug),
    t.uniqueIndex("user_email_idx").on(table.email),
    t.index("user_created_at_idx").on(table.created_at),
  ],
);

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users);

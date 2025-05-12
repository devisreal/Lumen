import * as t from "drizzle-orm/pg-core";

export const tags = t.pgTable(
  "tags",
  {
    id: t.serial("id").primaryKey(),
    name: t.varchar("name", { length: 100 }).notNull().unique(),
    slug: t.varchar("slug", { length: 100 }).notNull().unique(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    t.index("tag_name_idx").on(table.name),
    t.uniqueIndex("tag_slug_idx").on(table.slug),
    t.index("tag_created_at_idx").on(table.createdAt),
  ],
);

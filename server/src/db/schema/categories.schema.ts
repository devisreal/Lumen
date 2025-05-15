import * as t from "drizzle-orm/pg-core";

export const categories = t.pgTable(
  "categories",
  {
    id: t.serial("id").primaryKey(),
    name: t.varchar("name", { length: 255 }).notNull().unique(),
    slug: t.varchar().unique(),
  },
  (table) => [
    t.uniqueIndex("category_name_idx").on(table.name),
    t.uniqueIndex("category_slug_idx").on(table.slug),
  ],
);

import * as t from "drizzle-orm/pg-core";
import { categories } from "./categories.schema";
import { users } from "./users.schema";

export const postStatus = t.pgEnum("post_status", [
  "draft",
  "published",
  "archived",
  "deleted",
]);

export const posts = t.pgTable(
  "posts",
  {
    id: t.serial("id").primaryKey(),
    title: t.varchar("title", { length: 255 }).notNull(),
    slug: t.varchar("slug", { length: 255 }).notNull().unique(),
    content: t.text("content").notNull(),

    excerpt: t.varchar("excerpt", { length: 512 }),
    coverImageUrl: t.varchar("cover_image_url", { length: 512 }),

    status: postStatus("status").default("draft").notNull(),
    publishedAt: t.timestamp("published_at"),

    viewsCount: t.integer("views_count").default(0).notNull(),
    likesCount: t.integer("likes_count").default(0).notNull(),
    isFeatured: t.boolean("is_featured").default(false).notNull(),

    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at").notNull(),
    deletedAt: t.timestamp("deleted_at"),

    // Relations
    authorId: t.integer("author_id").references(() => users.id),
    categoryId: t.integer("category_id").references(() => categories.id),
  },
  (table) => [
    t.index("post_category_id_idx").on(table.categoryId),
    t.index("post_author_id_idx").on(table.authorId),
    t.index("post_title_idx").on(table.title),
    t.uniqueIndex("post_slug_idx").on(table.slug),
    t.index("post_status_idx").on(table.status),
    t.index("post_is_featured_idx").on(table.isFeatured),
    t.index("post_published_at_idx").on(table.publishedAt),
    t.index("post_created_at_idx").on(table.createdAt),
    t.index("post_deleted_at_idx").on(table.deletedAt),
  ],
);

import * as t from "drizzle-orm/pg-core";
import { posts } from "./posts.schema";
import { users } from "./users.schema";

export const commentStatusEnum = t.pgEnum("comment_status", [
  "pending",
  "approved",
  "rejected",
  "deleted",
  "flagged",
  "hidden",
]);

export const comments = t.pgTable(
  "comments",
  {
    id: t.serial("id").primaryKey(),
    postId: t
      .integer("post_id")
      .notNull()
      .references(() => posts.id),
    authorId: t
      .integer("author_id")
      .notNull()
      .references(() => users.id),
    content: t.text("content").notNull(),
    parentCommentId: t
      .integer("parent_comment_id")
      .references((): t.AnyPgColumn => comments.id),

    status: commentStatusEnum("status").default("approved").notNull(),

    createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: t.timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [
    t.index("comment_post_id_idx").on(table.postId),
    t.index("comment_author_id_idx").on(table.authorId),
    t.index("comment_parent_comment_id_idx").on(table.parentCommentId),
    t.index("comment_status_idx").on(table.status),
    t.index("comment_created_at_idx").on(table.createdAt),
    t.index("comment_deleted_at_idx").on(table.deletedAt),
  ],
);

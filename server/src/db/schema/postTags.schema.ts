import * as t from "drizzle-orm/pg-core";
import { posts } from "./posts.schema";
import { tags } from "./tags.schema";

export const postTags = t.pgTable(
  "post_tags",
  {
    postId: t
      .integer("post_id")
      .notNull()
      .references(() => posts.id),
    tagId: t
      .integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (table) => [
    t.index("post_id_idx").on(table.postId),
    t.index("tag_id_idx").on(table.tagId),
  ],
);

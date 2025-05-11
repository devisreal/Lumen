DROP INDEX "username_idx";--> statement-breakpoint
DROP INDEX "slug_idx";--> statement-breakpoint
DROP INDEX "email_idx";--> statement-breakpoint
DROP INDEX "created_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "category_name_idx" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX "comment_post_id_idx" ON "comments" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "comment_author_id_idx" ON "comments" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "comment_parent_comment_id_idx" ON "comments" USING btree ("parent_comment_id");--> statement-breakpoint
CREATE INDEX "comment_status_idx" ON "comments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "comment_created_at_idx" ON "comments" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "comment_deleted_at_idx" ON "comments" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "user_username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "user_slug_idx" ON "users" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "user_created_at_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "post_category_id_idx" ON "posts" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "post_author_id_idx" ON "posts" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "post_title_idx" ON "posts" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "post_slug_idx" ON "posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "post_status_idx" ON "posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "post_is_featured_idx" ON "posts" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "post_published_at_idx" ON "posts" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "post_created_at_idx" ON "posts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "post_deleted_at_idx" ON "posts" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "post_id_idx" ON "post_tags" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "tag_id_idx" ON "post_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "tag_name_idx" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "tag_slug_idx" ON "tags" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "tag_created_at_idx" ON "tags" USING btree ("created_at");
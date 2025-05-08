CREATE TYPE "public"."user_status" AS ENUM('active', 'banned', 'suspended', 'deactivated');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "user_status" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp;
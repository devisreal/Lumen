import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "@/db/schema";

export enum UserRoles {
  Admin = "admin",
  User = "user",
  Moderator = "moderator",
}

export type UserRole = keyof typeof UserRoles | `${UserRoles}`;

export type UserStatus = "active" | "banned" | "suspended" | "deactivated";

export const UserStatusMessages: Record<string, string> = {
  banned: "Your account has been banned. Please contact support.",
  deactivated: "Your account is deactivated. Reactivate to continue.",
  suspended: "Your account is suspended temporarily. Try again later.",
};

export type SelectUserModel = InferSelectModel<typeof users>;
export type InsertUserModel = InferInsertModel<typeof users>;

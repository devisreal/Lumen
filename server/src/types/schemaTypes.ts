import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "@/db/schema";

export type SelectUserModel = InferSelectModel<typeof users>;
export type InsertUserModel = InferInsertModel<typeof users>;

import { users } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectUserModel = InferSelectModel<typeof users>;
export type InsertUserModel = InferInsertModel<typeof users>;

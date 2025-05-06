import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

export const db = drizzle({
  connection: process.env.DATABASE_URL as string,
  casing: "snake_case",
  schema: schema,
});1

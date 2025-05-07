import { db } from "@/db";
import { and, eq as equals, exists } from "drizzle-orm";
import slugify from "slugify";
import { users } from "@/db/schema";
import { SelectUserModel } from "@/types/schemaTypes";

export function generateSlug(text: string): string {
  return (
    slugify(text, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    }) +
    "-" +
    Math.random().toString(36).substring(2, 4)
  );
}

export async function checkExistingUser(
  username: string,
  email: string,
): Promise<boolean> {
  try {
    const result = await db
      .select()
      .from(users)
      .where(and(equals(users.userName, username), equals(users.email, email)))
      .limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
}

export async function findUserBySlug(
  slug: string,
): Promise<Omit<SelectUserModel, "password"> | null> {
  const [user] = await db.select().from(users).where(equals(users.slug, slug));

  if (!user) return null;

  const { password, ...result } = user;
  return result;
}

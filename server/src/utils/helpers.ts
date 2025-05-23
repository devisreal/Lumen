import { db } from "@/db";
import { and, eq, eq as equals, exists } from "drizzle-orm";
import slugify from "slugify";
import { users } from "@/db/schema";
import { UserStatus } from "@/types/roles";
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

export async function updateUserStatus(userSlug: string, status: UserStatus) {
  try {
    const [result]: SelectUserModel[] = await db
      .update(users)
      .set({ status })
      .where(eq(users.slug, userSlug))
      .returning();

    if (status === "deactivated") {
      const now = new Date();

      await db
        .update(users)
        .set({
          deleted_at: now,
          updated_at: now,
        })
        .where(eq(users.slug, userSlug));
    }

    const { password, ...user } = result;
    return user;
  } catch (error) {
    console.error("Failed to update user status:", error);
    throw error;
  }
}

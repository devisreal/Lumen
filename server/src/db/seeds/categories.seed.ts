import * as schema from "@/db/schema";
import { db } from "../index";

export async function seedCategories() {
  const categories = [
    { name: "Technology", slug: "technology" },
    { name: "Design", slug: "design" },
    { name: "Business", slug: "business" },
    { name: "Health", slug: "health" },
    { name: "Lifestyle", slug: "lifestyle" },
    { name: "Education", slug: "education" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Science", slug: "science" },
    { name: "Politics", slug: "politics" },
    { name: "Sports", slug: "sports" },
    { name: "Travel", slug: "travel" },
    { name: "Food", slug: "food" },
  ];

  try {
    await db.insert(schema.categories).values(categories).onConflictDoNothing();
    console.log("✅ Seeded categories successfully!");
  } catch (err) {
    console.error("❌ Seeding failed", err);
  }
}

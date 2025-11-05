import { eq, desc, and, like } from "drizzle-orm";
import { blogPosts, BlogPost, InsertBlogPost } from "../drizzle/schema";
import { getDb } from "./db";

export async function getAllBlogPosts(publishedOnly: boolean = false) {
  const db = await getDb();
  if (!db) return [];

  const query = publishedOnly
    ? db.select().from(blogPosts).where(eq(blogPosts.published, 1)).orderBy(desc(blogPosts.publishedAt))
    : db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));

  return await query;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(blogPosts).values(post);
  
  // Return the created post by slug
  const created = await getBlogPostBySlug(post.slug);
  return created?.id ?? 0;
}

export async function updateBlogPost(id: number, updates: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function searchBlogPosts(searchTerm: string, publishedOnly: boolean = false) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [
    like(blogPosts.title, `%${searchTerm}%`),
  ];

  if (publishedOnly) {
    conditions.push(eq(blogPosts.published, 1));
  }

  return await db
    .select()
    .from(blogPosts)
    .where(and(...conditions))
    .orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostsByCategory(category: string, publishedOnly: boolean = false) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(blogPosts.category, category)];

  if (publishedOnly) {
    conditions.push(eq(blogPosts.published, 1));
  }

  return await db
    .select()
    .from(blogPosts)
    .where(and(...conditions))
    .orderBy(desc(blogPosts.createdAt));
}

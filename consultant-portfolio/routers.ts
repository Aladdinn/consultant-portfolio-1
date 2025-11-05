import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as blogDb from "./blogDb";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  blog: router({
    // Public routes
    list: publicProcedure
      .input(z.object({ publishedOnly: z.boolean().default(true) }).optional())
      .query(async ({ input }) => {
        return await blogDb.getAllBlogPosts(input?.publishedOnly ?? true);
      }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await blogDb.getBlogPostBySlug(input.slug);
        if (!post) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Article non trouvé" });
        }
        return post;
      }),
    
    search: publicProcedure
      .input(z.object({ term: z.string(), publishedOnly: z.boolean().default(true) }))
      .query(async ({ input }) => {
        return await blogDb.searchBlogPosts(input.term, input.publishedOnly);
      }),
    
    getByCategory: publicProcedure
      .input(z.object({ category: z.string(), publishedOnly: z.boolean().default(true) }))
      .query(async ({ input }) => {
        return await blogDb.getBlogPostsByCategory(input.category, input.publishedOnly);
      }),

    // Admin routes
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        coverImage: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.number().min(0).max(1).default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        const postId = await blogDb.createBlogPost({
          ...input,
          authorId: ctx.user.id,
          publishedAt: input.published === 1 ? new Date() : null,
        });
        return { id: postId };
      }),
    
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        coverImage: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.number().min(0).max(1).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        
        // Update publishedAt if changing to published
        if (updates.published === 1) {
          const existing = await blogDb.getBlogPostById(id);
          if (existing && existing.published === 0) {
            (updates as any).publishedAt = new Date();
          }
        }
        
        await blogDb.updateBlogPost(id, updates);
        return { success: true };
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await blogDb.deleteBlogPost(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

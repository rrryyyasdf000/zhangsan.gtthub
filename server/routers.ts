import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { subscribeNewsletter } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().trim().email("请输入有效的工作邮箱").max(320),
          source: z.string().trim().min(1).max(80).default("website"),
        })
      )
      .mutation(async ({ input }) => {
        const status = await subscribeNewsletter(input.email, input.source);
        return { status } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;

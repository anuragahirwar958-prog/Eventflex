import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createApplication, createEventAndJob, listLiveJobs } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  jobs: router({
    list: publicProcedure.query(() => listLiveJobs()),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(2),
        category: z.string().min(2),
        venueName: z.string().min(2),
        locationAddress: z.string().min(4),
        city: z.string().min(2),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        eventDate: z.number().int(),
        startTime: z.string().min(1),
        endTime: z.string().min(1),
        role: z.string().min(2),
        description: z.string().optional(),
        skills: z.array(z.string()).default([]),
        openings: z.number().int().positive(),
        payAmount: z.number().int().nonnegative(),
        status: z.enum(["draft", "live"]).default("draft"),
      }))
      .mutation(({ ctx, input }) => createEventAndJob(
        {
          organizerId: ctx.user.id,
          title: input.title,
          category: input.category,
          venueName: input.venueName,
          locationAddress: input.locationAddress,
          city: input.city,
          latitude: input.latitude?.toString(),
          longitude: input.longitude?.toString(),
          eventDate: input.eventDate,
          startTime: input.startTime,
          endTime: input.endTime,
        },
        {
          eventId: 0,
          organizerId: ctx.user.id,
          role: input.role,
          description: input.description,
          skills: input.skills.join(", "),
          openings: input.openings,
          payAmount: input.payAmount,
          status: input.status,
        },
      )),
  }),
  applications: router({
    submit: protectedProcedure
      .input(z.object({ jobId: z.number().int().positive() }))
      .mutation(({ ctx, input }) => createApplication(input.jobId, ctx.user.id)),
  }),
});

export type AppRouter = typeof appRouter;

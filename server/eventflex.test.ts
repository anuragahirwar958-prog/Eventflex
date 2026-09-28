import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 42,
    openId: "eventflex-test-user",
    email: "test@eventflex.example",
    name: "EventFlex Test User",
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("EventFlex marketplace procedures", () => {
  it("returns a list from the public job feed", async () => {
    const caller = appRouter.createCaller({ ...createContext(), user: null });
    const jobs = await caller.jobs.list();
    expect(Array.isArray(jobs)).toBe(true);
  });

  it("requires an exact event location when creating a job", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.jobs.create({
      title: "Location validation test",
      category: "Corporate Events",
      venueName: "Test Venue",
      locationAddress: "",
      city: "Bhopal",
      eventDate: Date.now(),
      startTime: "09:00",
      endTime: "17:00",
      role: "Registration Executive",
      skills: ["English"],
      openings: 2,
      payAmount: 1200,
      status: "draft",
    })).rejects.toThrow();
  });

  it("rejects non-positive job ids for applications", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.applications.submit({ jobId: 0 })).rejects.toThrow();
  });
});

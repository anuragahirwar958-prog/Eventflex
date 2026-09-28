import { boolean, decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const organizerProfiles = mysqlTable("organizer_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  organizationName: varchar("organizationName", { length: 180 }).notNull(),
  organizerType: varchar("organizerType", { length: 120 }),
  city: varchar("city", { length: 100 }),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const professionalProfiles = mysqlTable("professional_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  displayName: varchar("displayName", { length: 160 }).notNull(),
  city: varchar("city", { length: 100 }),
  skills: text("skills"),
  languages: text("languages"),
  experienceSummary: text("experienceSummary"),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "rejected"]).default("pending").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  organizerId: int("organizerId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  venueName: varchar("venueName", { length: 180 }).notNull(),
  locationAddress: text("locationAddress").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  eventDate: int("eventDate").notNull(),
  startTime: varchar("startTime", { length: 20 }).notNull(),
  endTime: varchar("endTime", { length: 20 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const jobPosts = mysqlTable("job_posts", {
  id: int("id").autoincrement().primaryKey(),
  eventId: int("eventId").notNull(),
  organizerId: int("organizerId").notNull(),
  role: varchar("role", { length: 160 }).notNull(),
  description: text("description"),
  skills: text("skills"),
  openings: int("openings").notNull(),
  payAmount: int("payAmount").notNull(),
  status: mysqlEnum("status", ["draft", "live", "closed", "completed"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull(),
  professionalId: int("professionalId").notNull(),
  status: mysqlEnum("status", ["new", "shortlisted", "interview", "hired", "rejected"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const attendance = mysqlTable("attendance", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull(),
  professionalId: int("professionalId").notNull(),
  qrToken: varchar("qrToken", { length: 180 }),
  checkInAt: timestamp("checkInAt"),
  checkOutAt: timestamp("checkOutAt"),
  venueVerified: boolean("venueVerified").default(false).notNull(),
  issueNote: text("issueNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull(),
  professionalId: int("professionalId").notNull(),
  amount: int("amount").notNull(),
  status: mysqlEnum("status", ["pending", "funded", "ready_to_release", "released", "disputed"]).default("pending").notNull(),
  fundedAt: timestamp("fundedAt"),
  releasedAt: timestamp("releasedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
export type JobPost = typeof jobPosts.$inferSelect;
export type InsertJobPost = typeof jobPosts.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

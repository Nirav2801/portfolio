import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid,
  primaryKey,
  jsonb,
} from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  experience: varchar("experience", { length: 50 }).notNull(),
  role: text("role").notNull(),
  tagline: text("tagline").notNull(),
  bio: text("bio").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const location = pgTable("location", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .references(() => profile.id, { onDelete: "cascade" })
    .notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  timezone: varchar("timezone", { length: 50 }).notNull(),
  mapUrl: text("map_url"),
});

export const contact = pgTable("contact", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .references(() => profile.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  availabilityStatus: varchar("availability_status", { length: 50 }).notNull(),
});

export const social_links = pgTable("social_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .references(() => profile.id, { onDelete: "cascade" })
    .notNull(),
  platform: varchar("platform", { length: 50 }).notNull(),
  url: text("url").notNull(),
  handle: varchar("handle", { length: 100 }),
  meta: jsonb("meta"),
});

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl").notNull(),
  details: text("details").notNull(),
  demoUrl: text("demoUrl"),
  repoUrl: text("repoUrl"),
});

export const skills = pgTable("skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => skill_category.id),
});

export const project_skills = pgTable(
  "project_skills",
  {
    projectId: uuid("project_id")
      .references(() => projects.id)
      .notNull(),
    skillId: uuid("skill_id")
      .references(() => skills.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.skillId] })],
);

export const skill_category = pgTable("skill_category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

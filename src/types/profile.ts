import { InferSelectModel } from "drizzle-orm";
import {
  profile,
  location,
  contact,
  social_links,
  projects,
  skills,
} from "../db/schema";

export type ProfileData = InferSelectModel<typeof profile>;
export type DbLocationData = InferSelectModel<typeof location>;
export type DbContactData = InferSelectModel<typeof contact>;
export type DbSocialLinkData = InferSelectModel<typeof social_links>;
export type DbProjectData = InferSelectModel<typeof projects>;
export type DbSkillData = InferSelectModel<typeof skills>;

import { db } from "./index";
import {
  profile,
  location,
  contact,
  social_links,
  projects,
  skills,
  skill_category,
  project_skills,
} from "./schema";

export const getProfile = async () => {
  try {
    const result = await db.select().from(profile);
    return result;
  } catch (error) {
    console.error("❌ Error in getting profile data");
  }
};

export const getLocation = async () => {
  try {
    const result = await db.select().from(location);
    return result;
  } catch (error) {
    console.error("❌ Error in getting location data", error);
  }
};

export const getContact = async () => {
  try {
    const result = await db.select().from(contact);
    return result;
  } catch (error) {
    console.error("❌ Error in getting contact data", error);
  }
};

export const getSocialLinks = async () => {
  try {
    const result = await db.select().from(social_links);
    return result;
  } catch (error) {
    console.error("❌ Error in getting social links data", error);
  }
};

export const getProjects = async () => {
  try {
    const result = await db.select().from(projects);
    return result;
  } catch (error) {
    console.error("❌ Error in getting projects data", error);
  }
};

export const getSkills = async () => {
  try {
    const result = await db.select().from(skills);
    return result;
  } catch (error) {
    console.error("❌ Error in getting skills data", error);
  }
};

export const getSkillCategories = async () => {
  try {
    const result = await db.select().from(skill_category);
    return result;
  } catch (error) {
    console.error("❌ Error in getting skill categories data", error);
  }
};

export const getProjectSkills = async () => {
  try {
    const result = await db.select().from(project_skills);
    return result;
  } catch (error) {
    console.error("❌ Error in getting project skills data", error);
  }
};

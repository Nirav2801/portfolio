import "dotenv/config";
import { db } from "../../db/index";
import {
  profile,
  location,
  contact,
  social_links,
  projects,
  skills,
  skill_category,
  project_skills,
} from "../../db/schema";
import { PROFILE, PROJECTS, SKILLS, CONSTANTS } from "@/src/data/constants";

async function seed() {
  console.log("🌱 Starting seed...");
  try {
    console.log("🧹 Clearing old data to ensure perfect sync...");
    await db.delete(project_skills);
    await db.delete(projects);
    await db.delete(skills);
    await db.delete(skill_category);
    await db.delete(social_links);
    await db.delete(contact);
    await db.delete(location);
    await db.delete(profile);

    console.log("👤 Seeding profile...");
    const [insertedProfile] = await db
      .insert(profile)
      .values({
        name: PROFILE.name,
        role: PROFILE.role,
        experience: PROFILE.experience,
        tagline: PROFILE.tagline,
        bio: PROFILE.bio,
        description: PROFILE.description,
      })
      .returning();

    console.log("📍 Seeding location...");
    await db.insert(location).values({
      profileId: insertedProfile.id,
      city: CONSTANTS.location.city,
      timezone: CONSTANTS.location.timezone,
      mapUrl: CONSTANTS.location.mapUrl,
    });

    console.log("📞 Seeding contact...");
    await db.insert(contact).values({
      profileId: insertedProfile.id,
      email: CONSTANTS.contact.email,
      phone: CONSTANTS.contact.phone || "",
      availabilityStatus: CONSTANTS.contact.availabilityStatus,
    });

    console.log("🌐 Seeding social links...");
    const socialLinksData = CONSTANTS.socialLinks.map((link) => ({
      profileId: insertedProfile.id,
      platform: link.platform,
      url: link.url,
      handle: link.handle,
      meta: link.meta,
    }));
    await db.insert(social_links).values(socialLinksData);

    console.log("🏷️ Seeding skill categories and skills...");
    const skillNameToIdMap = new Map<string, string>();
    for (const category of SKILLS) {
      const [insertedCategory] = await db
        .insert(skill_category)
        .values({ name: category.name })
        .returning({ id: skill_category.id });

      for (const skillName of category.skills) {
        const [insertedSkill] = await db
          .insert(skills)
          .values({ name: skillName, categoryId: insertedCategory.id })
          .returning({ id: skills.id });
        skillNameToIdMap.set(skillName, insertedSkill.id);
      }
    }

    console.log("🚀 Seeding projects and project skills...");

    for (const projectData of PROJECTS) {
      const [insertedProject] = await db
        .insert(projects)
        .values({
          title: projectData.title,
          description: projectData.description,
          imageUrl: projectData.imageUrl,
          details: projectData.details,
          demoUrl: projectData.demoUrl,
          repoUrl: projectData.repoUrl,
        })
        .returning({ id: projects.id });

      for (const tag of projectData.tags) {
        const skillId = skillNameToIdMap.get(tag);
        if (skillId) {
          await db.insert(project_skills).values({
            projectId: insertedProject.id,
            skillId: skillId,
          });
        } else {
          console.warn(
            `⚠️ Skill '${tag}' on project '${projectData.title}' not found in SKILLS constant. Skipping...`,
          );
        }
      }
    }

    console.log("✅ Seed successful.");
  } catch (error) {
    console.error("❌ Seed failed.");
    console.error(error);
    process.exit(1);
  }
}

seed()
  .then(() => {
    console.log("🎉 Seeding complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("💥 Unexpected error:", err);
    process.exit(1);
  });

import "dotenv/config";
import { db } from "../../db/index.js";
import { sql } from "drizzle-orm";

async function resetDb() {
  console.log("Dropping all tables...");
  await db.execute(sql`
    DROP TABLE IF EXISTS "project_skills" CASCADE;
    DROP TABLE IF EXISTS "projects" CASCADE;
    DROP TABLE IF EXISTS "skills" CASCADE;
    DROP TABLE IF EXISTS "skill_category" CASCADE;
    DROP TABLE IF EXISTS "social_links" CASCADE;
    DROP TABLE IF EXISTS "contact" CASCADE;
    DROP TABLE IF EXISTS "location" CASCADE;
    DROP TABLE IF EXISTS "profile" CASCADE;
  `);
  console.log("Tables dropped successfully.");
  process.exit(0);
}

resetDb().catch((err) => {
  console.error("Error dropping tables:", err);
  process.exit(1);
});

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
import { eq } from "drizzle-orm";
import { embeddings } from "../huggingfaceClient";
import { supabase } from "../supabaseClient";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Document {
  content: string;
  metadata: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Helper: build the flat list of documents from the DB
// ---------------------------------------------------------------------------

async function buildDocuments(): Promise<Document[]> {
  const docs: Document[] = [];

  // ── Profile ────────────────────────────────────────────────────────────────
  console.log("📖 Fetching profile data...");
  const [p] = await db.select().from(profile);
  if (!p) throw new Error("No profile found in DB. Run `npm run seed` first.");

  docs.push({
    content: [
      `Name: ${p.name}`,
      `Role: ${p.role}`,
      `Experience: ${p.experience}`,
      `Tagline: ${p.tagline}`,
      `Bio: ${p.bio}`,
      `Description: ${p.description}`,
    ].join("\n"),
    metadata: { type: "profile", name: p.name },
  });

  // ── Location ───────────────────────────────────────────────────────────────
  console.log("📍 Fetching location data...");
  const [loc] = await db
    .select()
    .from(location)
    .where(eq(location.profileId, p.id));

  if (loc) {
    docs.push({
      content: [
        `Nirav Patel is based in ${loc.city}.`,
        `Timezone: ${loc.timezone}.`,
      ].join(" "),
      metadata: { type: "location", city: loc.city },
    });
  }

  // ── Contact ────────────────────────────────────────────────────────────────
  console.log("📞 Fetching contact data...");
  const [con] = await db
    .select()
    .from(contact)
    .where(eq(contact.profileId, p.id));

  if (con) {
    docs.push({
      content: [
        `Contact email: ${con.email}.`,
        con.phone ? `Phone: ${con.phone}.` : "",
        `Availability: ${con.availabilityStatus}.`,
      ]
        .filter(Boolean)
        .join(" "),
      metadata: { type: "contact", email: con.email },
    });
  }

  // ── Social Links ───────────────────────────────────────────────────────────
  console.log("🌐 Fetching social links...");
  const socials = await db
    .select()
    .from(social_links)
    .where(eq(social_links.profileId, p.id));

  for (const s of socials) {
    const parts = [
      `${p.name} can be found on ${s.platform}`,
      s.handle ? `as ${s.handle}` : "",
      `at ${s.url}.`,
    ].filter(Boolean);

    docs.push({
      content: parts.join(" "),
      metadata: { type: "social_link", platform: s.platform, url: s.url },
    });
  }

  // ── Skills ─────────────────────────────────────────────────────────────────
  console.log("🏷️ Fetching skills...");
  const categories = await db.select().from(skill_category);

  for (const cat of categories) {
    const categorySkills = await db
      .select()
      .from(skills)
      .where(eq(skills.categoryId, cat.id));

    const skillNames = categorySkills.map((s) => s.name);

    docs.push({
      content: `${p.name}'s ${cat.name} skills include: ${skillNames.join(", ")}.`,
      metadata: {
        type: "skills",
        category: cat.name,
        skills: skillNames,
      },
    });
  }

  // ── Projects ───────────────────────────────────────────────────────────────
  console.log("🚀 Fetching projects...");
  const allProjects = await db.select().from(projects);

  for (const proj of allProjects) {
    // Fetch tags for this project
    const tags = await db
      .select({ name: skills.name })
      .from(project_skills)
      .innerJoin(skills, eq(project_skills.skillId, skills.id))
      .where(eq(project_skills.projectId, proj.id));

    const tagNames = tags.map((t) => t.name);

    const content = [
      `Project: ${proj.title}`,
      `Description: ${proj.description}`,
      `Details: ${proj.details}`,
      tagNames.length > 0 ? `Technologies used: ${tagNames.join(", ")}.` : "",
      proj.demoUrl && proj.demoUrl !== "#" ? `Live demo: ${proj.demoUrl}.` : "",
      proj.repoUrl && proj.repoUrl !== "#"
        ? `Source code: ${proj.repoUrl}.`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    docs.push({
      content,
      metadata: {
        type: "project",
        title: proj.title,
        tags: tagNames,
        demoUrl: proj.demoUrl,
        repoUrl: proj.repoUrl,
      },
    });
  }

  return docs;
}

// ---------------------------------------------------------------------------
// Main: embed + upsert into Supabase `documents` table
// ---------------------------------------------------------------------------

async function seedVectors() {
  console.log("\n🚀 Starting vector seeding...\n");

  // 1. Build plain-text documents from DB
  const docs = await buildDocuments();
  console.log(`\n📝 Prepared ${docs.length} document chunks to embed.\n`);

  // 2. Clear existing docs so we get a clean slate each run
  console.log("🧹 Clearing existing documents table...");
  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .neq("id", 0); // delete all rows

  if (deleteError) {
    throw new Error(`Failed to clear documents: ${deleteError.message}`);
  }
  console.log("✅ Cleared existing embeddings.\n");

  // 3. Embed + insert each chunk
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    console.log(
      `🔢 [${i + 1}/${docs.length}] Embedding: "${doc.content.slice(0, 60).replace(/\n/g, " ")}..."`,
    );

    try {
      // embedDocuments returns number[][] – one vector per document
      const [vector] = await embeddings.embedDocuments([doc.content]);

      const { error } = await supabase.from("documents").insert({
        content: doc.content,
        metadata: doc.metadata,
        embedding: vector, // number[] → stored as vector(768)
      });

      if (error) {
        console.error(`  ❌ Insert failed: ${error.message}`);
      } else {
        console.log(`  ✅ Inserted.`);
      }
    } catch (err) {
      console.error(`  ❌ Embedding error:`, err);
    }

    // Small delay to avoid hitting HuggingFace rate-limits on free tier
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("\n🎉 Vector seeding complete!");
  console.log(`   Total documents in store: ${docs.length}`);
  console.log(
    "   You can now query them via the match_documents() Supabase function.\n",
  );
}

seedVectors()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("💥 Unexpected error:", err);
    process.exit(1);
  });

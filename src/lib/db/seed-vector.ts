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

  // ── Work Experience ────────────────────────────────────────────────────────
  console.log("💼 Fetching custom work experience and resume details...");
  const workExperiences = [
    {
      company: "The Special Character",
      role: "Software Developer",
      location: "Ahmedabad, Gujarat",
      dates: "2024-2026",
      responsibilities: [
        "Developed and maintained an e-commerce platform using Next.js and MedusaJS (Node.js-based) for backend services.",
        "Worked with PostgreSQL for product, order, and user data management with efficient querying and schema handling.",
        "Implemented RESTful APIs within MedusaJS backend.",
        "Built dynamic product listings, filtering, cart, and checkout workflows.",
        "Integrated payment gateways and third-party services for shipping and analytics.",
        "Managed structured and dynamic content using Payload CMS and Strapi, enabling non-technical teams to control product and marketing content efficiently.",
        "Gained basic exposure to Docker and used Git/GitHub for version control and collaborative development.",
        "Contributed to Next.js SEO optimization, performance tuning, and structured metadata implementation for better search visibility.",
        "Leveraged Al-assisted development tools such as GitHub Copilot, Cursor, Claude, and Google Antigravity to accelerate development, improve code quality, and enhance productivity.",
        "Explored modern Al-powered development workflows including Spec-driven development (SpecKit) and rapid UI generation tools like Google Stitch.",
        "Built workflow automations using n8n.",
        "Continuously researched and applied AI-assisted coding, automation, and workflow optimization techniques to improve engineering efficiency.",
      ],
    },
    {
      company: "The Special Character",
      role: "Software Developer Intern",
      location: "Ahmedabad, Gujarat",
      dates: "2023-2024",
      responsibilities: [
        "Developed responsive and mobile-first web interfaces using HTML5 and CSS3, ensuring cross-browser compatibility and adherence to modern UI/UX best practices.",
        "Implemented interactive client-side features using JavaScript (ES6+), including DOM manipulation, form validation, dynamic rendering, and event-driven behaviors.",
        "Developed multi-page and dynamic web applications using Next.js, leveraging file-based routing, optimized navigation, and Server-Side Rendering (SSR) for improved performance and SEO.",
        "Built reusable and modular UI components using React.js, applying component-based architecture, basic state management principles, and supportive libraries.",
        "Integrated and consumed RESTful APIs to fetch and render dynamic data, handling loading states, error management, and data transformation on the frontend.",
        "Assisted in debugging and troubleshooting UI issues, improving page load performance, and optimizing rendering efficiency.",
        "Used Git and GitHub for version control and collaborative development.",
      ],
    },
    {
      company: "Lisco",
      role: "Project Leader",
      description:
        "Served as the Project Leader for Lisco, a scalable e-commerce platform specializing in printers, inks, and AMC services. Led the end-to-end development of both frontend and backend, building RESTful APIs, dynamic filters, and a responsive, user-friendly UI. Integrated SEO best practices along with Google Analytics, Tag Manager, and Search Console. Used Payload CMS to manage events, careers, job applications, and gallery modules. Deployed the platform on Coolify. TechStack: Next.js, Medusa.js, PayloadCMS, PostgreSQL.",
    },
    {
      company: "Auco E-commerce",
      role: "Software Developer",
      description:
        "Contributed to AUCO - an e-commerce platform for tailored NFC cards to build it in Next.js/React.js Medusa.js-PostgreSQL backend using Razorpay for payments with integration and for shipment tracking into Delhivery and managed a well-engineered responsive UI along with handling real-time customization of NFC card with a perfectly intuitive admin interface. TechStack: NextJS, Strapi, GraphQL, PostgreSQL.",
    },
    {
      company: "InHouse",
      role: "Software Developer",
      description:
        "InHouse Room Calibration Tool — A web-based interactive room configuration system designed for multifamily housing. The platform is built using Next.js and TypeScript, uses a type-safe API layer powered by tRPC. Supabase and Drizzle ORM are used for data storage. Integrates Hygraph CMS via GraphQL. Interactive room visualization with furniture hotspots, product assignment, layout and style switching. TechStack: Next.js, Node.js, Supabase, PostgreSQL, Google Maps, Redis, Docker, TypeScript, Tailwind CSS.",
    },
    {
      company: "Yogateria",
      role: "Software Developer",
      description:
        "Contributed to developing a scalable e-commerce platform using Next.js for a responsive UI and Medusa.js V1/V2 for flexibility. Integrated Builder.io, Payload for real-time UI customization, TinyERP for inventory and order management, Tapfiliate for affiliate marketing, and PagBank for secure payments.",
    },
    {
      company: "Auco application (Auto Connect)",
      role: "Software Developer",
      description:
        "AUCO is an innovative digital business card management app that makes the process of designing, personalizing, and sharing professional information less complicated. Tech Stack: ReactNative, Redux, Redux-Saga, PostgreSQL, Strapi, GraphQL.",
    },
    {
      company: "Jewel",
      role: "Software Developer",
      description:
        "Integrated Next.js, Medusa, and Payload CMS to build a dynamic website. Created multiple versions of key components like banners, allowing selection directly from Payload CMS. Implemented seamless integration between Medusa and Payload CMS for automatic product syncing. Supported global theme customization. TechStack: PayloadCMS, Next.js, Medusa.js, PostgreSQL.",
    },
    {
      company: "TreadCommand",
      role: "Software Developer",
      description:
        "Developed a comprehensive mobile tire service platform combining a Medusa-based e-commerce API with PayloadCMS admin dashboard to deliver on-demand tire installation and repair services. Features advanced Fleet & Technician Management System with real-time scheduling using Nylas API, automated route optimization through Routific API. Geographic Service Coverage with dynamic pricing engine. TechStack: Node.js, Next.js, Medusa.js, PayloadCMS, PostgreSQL, Nylas API, Routific API.",
    },
  ];

  for (const exp of workExperiences) {
    const content = [
      `Work Experience at ${exp.company}`,
      `Role: ${exp.role}`,
      exp.location ? `Location: ${exp.location}` : "",
      exp.dates ? `Dates: ${exp.dates}` : "",
      exp.description ? `Description: ${exp.description}` : "",
      exp.responsibilities
        ? `Responsibilities:\n- ${exp.responsibilities.join("\n- ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    docs.push({
      content,
      metadata: {
        type: "work_experience",
        company: exp.company,
        role: exp.role,
      },
    });
  }

  // ── Education ────────────────────────────────────────────────────────
  console.log("🎓 Fetching education...");
  const education = [
    {
      institution: "LDRP-ITR",
      location: "Gandhinagar, India",
      degree: "Bachelor of Engineering (B.E.) in Computer Engineering",
      dates: "2020-2024",
      grade: "8.42 CGPA",
    },
  ];

  for (const edu of education) {
    const content = `Education: Nirav Patel studied at ${edu.institution} in ${edu.location}, obtaining a ${edu.degree} from ${edu.dates} with a grade of ${edu.grade}.`;
    docs.push({
      content,
      metadata: {
        type: "education",
        institution: edu.institution,
        degree: edu.degree,
      },
    });
  }

  // ── Certification ────────────────────────────────────────────────────────
  console.log("📜 Fetching certifications...");
  const certifications = [
    {
      title: "Python for data science",
      issuer: "NPTEL",
    },
  ];

  for (const cert of certifications) {
    const content = `Certification: Nirav Patel holds a certification in "${cert.title}" issued by ${cert.issuer}.`;
    docs.push({
      content,
      metadata: { type: "certification", title: cert.title },
    });
  }

  // ── Additional QA info for RAG ────────────────────────────────────────────────────────
  console.log("❓ Fetching Q&A info...");
  const qaInfo = [
    "Q: Who is Nirav Patel? A: Nirav Patel is a Full Stack Developer from Belcamp, MD with 2+ years of experience building scalable web applications. He specializes in full-stack development, notably using Next.js, React, Node.js, PostgreSQL, and MedusaJS. He is proficient in AI-assisted development tools to accelerate workflows.",
    "Q: How many years of experience does Nirav have? A: Over 2 years of professional experience as a Full Stack Developer.",
    "Q: What frontend technologies does Nirav use? A: JavaScript (ES6+), TypeScript, HTML5, CSS3, Next.js, React.js, Tailwind CSS, and React Native.",
    "Q: What backend and database technologies does Nirav use? A: Node.js, MedusaJS, REST APIs, PostgreSQL, Supabase, and MongoDB.",
    "Q: Has Nirav worked with any CMS? A: Yes, he has experience managing structured and dynamic content using Payload CMS, Strapi, and Hygraph CMS via GraphQL.",
    "Q: Where did Nirav study? A: He completed his Bachelor of Engineering (B.E.) in Computer Engineering at LDRP-ITR in Gandhinagar, India from 2020 to 2024.",
    "Q: What was Nirav's role at The Special Character? A: He worked as a Software Developer Intern from 2023-2024, and then as a Software Developer from 2024-2026.",
    "Q: Does Nirav use AI tools for development? A: Yes, he leverages AI-assisted development tools such as GitHub Copilot, Cursor, Claude, SpecKit, n8n, Google Stitch, and Google Antigravity to accelerate development and improve code quality.",
    "Q: Did Nirav build TreadCommand? A: Yes, he developed TreadCommand, a mobile tire service platform with Medusa-based e-commerce, PayloadCMS admin, real-time scheduling (Nylas API), and route optimization (Routific API).",
    "Q: Where is Nirav located? A: Belcamp, MD. He was previously located in Ahmedabad, Gujarat, India.",
    "Q: Did Nirav work on InHouse? A: Yes, he worked on InHouse Room Calibration Tool, a web-based interactive room configuration system using Next.js, TypeScript, tRPC, Supabase, Drizzle ORM, and Hygraph CMS.",
    "Q: Did Nirav work on Lisco? A: Yes, he worked as Project Leader for Lisco, building a scalable e-commerce platform using Next.js, Medusa.js, PayloadCMS, and PostgreSQL, deployed on Coolify.",
    "Q: Did Nirav work on Auco? A: Yes, he contributed to Auco E-commerce and Auco digital business card management app using React Native, Next.js, Strapi, and PostgreSQL.",
  ];

  for (const qa of qaInfo) {
    docs.push({
      content: qa,
      metadata: { type: "qa_info" },
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

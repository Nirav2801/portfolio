import { Project, SkillCategory, SectionId, AppConstants } from "../types";

export const NAV_LINKS = [
  { label: "About", href: `#${SectionId.ABOUT}` },
  { label: "Skills", href: `#${SectionId.SKILLS}` },
  { label: "Projects", href: `#${SectionId.PROJECTS}` },
  { label: "Contact", href: `#${SectionId.CONTACT}` },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "TreadCommand",
    description:
      "A comprehensive mobile tire service platform combining a Medusa-based e-commerce API with PayloadCMS admin dashboard.",
    tags: ["Node.js", "Next.js", "Medusa.js", "Payload CMS", "PostgreSQL"],
    imageUrl: "https://picsum.photos/800/600?random=1",
    details:
      "Features advanced Fleet & Technician Management System with real-time scheduling using Nylas API, mobile van capacity tracking, and automated route optimization through Routific API. Built sophisticated Geographic Service Coverage with polygon-based service area definitions.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "2",
    title: "InHouse Room Calibration Tool",
    description:
      "A web-based interactive room configuration system designed for multifamily housing.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "TypeScript"],
    imageUrl: "https://picsum.photos/800/600?random=2",
    details:
      "Allows residents to customize and preview their living spaces with real-time product swaps and layout changes. Supabase and Drizzle ORM are used for data storage, authentication, and enforcing multi-tenant separation through row-level security.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "3",
    title: "Lisco E-Commerce",
    description:
      "A scalable e-commerce platform specializing in printers, inks, and AMC services.",
    tags: ["Next.js", "Medusa.js", "Payload CMS", "PostgreSQL"],
    imageUrl: "https://picsum.photos/800/600?random=3",
    details:
      "Led the end-to-end development of both frontend and backend, building RESTful APIs, dynamic filters, and a responsive, user-friendly UI. Integrated SEO best practices, Google Analytics, and deployed on Coolify.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "4",
    title: "Auco E-commerce",
    description: "An e-commerce platform for tailored NFC cards.",
    tags: ["Next.js", "Strapi", "GraphQL", "PostgreSQL"],
    imageUrl: "https://picsum.photos/800/600?random=4",
    details:
      "Built with Medusa.js-PostgreSQL backend using Razorpay for payments and Delhivery for shipment tracking. Managed real-time customization of NFC cards with an intuitive admin interface.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "5",
    title: "Yogateria",
    description:
      "A scalable e-commerce platform using Medusa.js and Builder.io.",
    tags: ["Next.js", "Medusa.js", "Builder.io", "Payload CMS", "PostgreSQL"],
    imageUrl: "https://picsum.photos/800/600?random=5",
    details:
      "Integrated Builder.io and Payload for real-time UI customization, TinyERP for inventory management, Tapfiliate for affiliate marketing, and PagBank for secure payments.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "6",
    title: "Auco Application (Auto Connect)",
    description: "Innovative digital business card management app.",
    tags: ["React Native", "Redux", "PostgreSQL", "Strapi", "GraphQL"],
    imageUrl: "https://picsum.photos/800/600?random=6",
    details:
      "A paper-free alternative to conventional business cards, providing a frictionless, paperless way to manage and share contacts.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "7",
    title: "Jewel",
    description:
      "Dynamic and user-friendly website for non-technical clients using Medusa and Payload CMS.",
    tags: ["Next.js", "Medusa.js", "Payload CMS", "PostgreSQL"],
    imageUrl: "https://picsum.photos/800/600?random=7",
    details:
      "Integrated Medusa and Payload CMS for a responsive UI and easy content management. Product listings synced automatically, allowing full creative control over the website's appearance.",
    demoUrl: "#",
    repoUrl: "#",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5/CSS3",
      "React Native",
    ],
  },
  {
    name: "Backend",
    skills: ["Node.js", "MedusaJS", "REST APIs"],
  },
  {
    name: "Database & CMS",
    skills: ["PostgreSQL", "MongoDB", "Supabase", "Payload", "Strapi"],
  },
  {
    name: "Tools & DevOps",
    skills: ["Git/GitHub", "Docker", "Postman", "n8n", "Vercel"],
  },
];

export const PROFILE = {
  name: "Nirav Patel",
  role: "Fullstack Developer",
  tagline:
    "Building scalable e-commerce applications and interactive web experiences",
  availabilityStatus: "Available",
  bio: "Fullstack Developer with 2 years of experience building scalable applications using Next.js, React, Node.js, and PostgreSQL. Experienced in startup environments, delivering production-ready platforms using modern tools like Supabase, MedusaJS, Payload and Strapi CMS.",
  location: "Belcamp, MD",
  email: "niravpatel280103@gmail.com",
  titleHighlight: "Developer.",
  description:
    "Crafting digital experiences with Next.js, Node.js, and scalable architectures.",
};

export const CONSTANTS: AppConstants = {
  siteParams: {
    title: "Nirav Patel | Full Developer",
    description:
      "Portfolio of Nirav Patel, a Full Developer specializing in Next.js, Node.js, and scalable web architectures.",
    url: "https://nirav-portfolio.vercel.app",
  },
  location: {
    city: "Belcamp, MD",
    timezone: "EST",
    mapUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop",
  },
  spotify: {
    status: "On Repeat",
    song: "Coding Focus Mix",
    url: "#",
  },
  social: {
    label: "LinkedIn",
    handle: "@niravpatel28",
    url: "https://www.linkedin.com/in/niravpatel28/",
  },
  stack: {
    title: "Stack",
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL"],
  },
  projectsSection: {
    title: "Projects",
    subtitle: "Selected works & experiments",
  },
  gallery: {
    title: "Aesthetics",
    subtitle: "Design Philosophy",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  github: {
    commits: "240+",
    label: "Commits this year",
    url: "https://github.com/Nirav2801",
  },
  contact: {
    heading: "Have a project",
    headingHighlight: "in mind?",
    status: "Available",
  },
  services: {
    title: "Services",
    category: "Full Stack Development & E-Commerce Solutions",
  },
  footer: {
    copyrightInfo: "Nirav Patel. All Rights Reserved.",
  },
};

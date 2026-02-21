export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  details: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export enum SectionId {
  HERO = "hero",
  ABOUT = "about",
  SKILLS = "skills",
  PROJECTS = "projects",
  CONTACT = "contact",
  SERVICES = "services",
  LOCATION = "location",
  SPOTIFY = "spotify",
  SOCIAL = "social",
  GALLERY = "gallery",
  GITHUB = "github",
}

export interface SiteData {
  title: string;
  description: string;
  url: string;
}

export interface LocationData {
  city: string;
  timezone: string;
  mapUrl: string;
}

export interface SpotifyData {
  status: string;
  song: string;
  url: string;
}

export interface SocialData {
  label: string;
  handle: string;
  url: string;
}

export interface StackData {
  title: string;
  technologies: string[];
}

export interface BaseSectionData {
  title: string;
  subtitle: string;
}

export interface GalleryData extends BaseSectionData {
  imageUrl: string;
}

export interface GithubData {
  commits: string;
  label: string;
  url: string;
}

export interface ContactData {
  heading: string;
  headingHighlight: string;
  status: string;
}

export interface ServiceData {
  title: string;
  category: string;
}

export interface FooterData {
  copyrightInfo: string;
}

export interface AppConstants {
  siteParams: SiteData;
  location: LocationData;
  spotify: SpotifyData;
  social: SocialData;
  stack: StackData;
  projectsSection: BaseSectionData;
  gallery: GalleryData;
  github: GithubData;
  contact: ContactData;
  services: ServiceData;
  footer: FooterData;
}

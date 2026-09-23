/**
 * Content for the Professional portfolio page.
 * Source of truth aligned with CV — Fatwa Wiratama Sebayang.
 * Media: public/projects/<slug>/cover.jpg|demo.mp4, public/about/portrait.png
 */

export const profile = {
  name: "Fatwa Wiratama Sebayang",
  shortName: "Fatwa",
  role: "Junior Full Stack JavaScript Developer",
  location: "Bekasi, Indonesia",
  availability: "Open to opportunities",
  email: "fatwawiratama23@gmail.com",
  phone: "+62 813-2049-3384",
  phoneHref: "tel:+6281320493384",
  whatsapp: "https://wa.me/6281320493384",
  instagram: "https://www.instagram.com/wirasebayangg_",
  github: "https://github.com/wirasebayang",
  linkedin: "https://www.linkedin.com/in/fatwa-wiratama-sebayang/",
  tagline:
    "I build responsive web apps, RESTful APIs, real-time systems, and AI-powered features.",
  about: `Junior Full Stack JavaScript Developer and Hacktiv8 graduate with hands-on experience building responsive web applications, RESTful APIs, real-time systems, payment integrations, and AI-powered features. Proficient in React, Redux Toolkit, Node.js, Express, PostgreSQL, MongoDB, and GraphQL. Previously worked for four years in material control, developing strong analytical, process-improvement, teamwork, and problem-solving skills.`,
  stats: [
    { value: "4", label: "Selected projects" },
    { value: "4 yrs", label: "Material control ops" },
    { value: "H8", label: "Hacktiv8 graduate" },
  ],
} as const;

/** Tech Index categories */
export const techCategories = [
  "All",
  "Frontend & Mobile",
  "Backend & APIs",
  "Data & Storage",
  "Client & Integrations",
  "Cloud & Deployment",
  "Workflow & Testing",
] as const;

export type TechCategory = (typeof techCategories)[number];

export type TechItem = {
  name: string;
  category: Exclude<TechCategory, "All">;
  /** simpleicons slug — https://cdn.simpleicons.org/{slug} */
  icon: string;
};

/** Full tool list (shared index + CV skills) */
export const technologies: TechItem[] = [
  { name: "TypeScript", category: "Frontend & Mobile", icon: "typescript" },
  { name: "JavaScript", category: "Frontend & Mobile", icon: "javascript" },
  { name: "React", category: "Frontend & Mobile", icon: "react" },
  { name: "Next.js", category: "Frontend & Mobile", icon: "nextdotjs" },
  { name: "Node.js", category: "Backend & APIs", icon: "nodedotjs" },
  { name: "PostgreSQL", category: "Data & Storage", icon: "postgresql" },
  { name: "Express", category: "Backend & APIs", icon: "express" },
  { name: "Tailwind CSS", category: "Frontend & Mobile", icon: "tailwindcss" },
  { name: "REST API", category: "Backend & APIs", icon: "postman" },
  { name: "Git", category: "Workflow & Testing", icon: "git" },
  { name: "AWS EC2", category: "Cloud & Deployment", icon: "/icons/aws.svg" },
  { name: "MongoDB", category: "Data & Storage", icon: "mongodb" },
  { name: "HTML", category: "Frontend & Mobile", icon: "html5" },
  { name: "CSS", category: "Frontend & Mobile", icon: "css" },
  { name: "Vite", category: "Workflow & Testing", icon: "vite" },
  { name: "Zod", category: "Backend & APIs", icon: "zod" },
  { name: "Redis", category: "Data & Storage", icon: "redis" },
  { name: "React Native", category: "Frontend & Mobile", icon: "react" },
  { name: "Expo", category: "Frontend & Mobile", icon: "expo" },
  { name: "GraphQL", category: "Backend & APIs", icon: "graphql" },
  { name: "Socket.IO", category: "Backend & APIs", icon: "socketdotio" },
  { name: "GitHub", category: "Workflow & Testing", icon: "github" },
  { name: "Vercel", category: "Cloud & Deployment", icon: "vercel" },
  { name: "Gemini API", category: "Client & Integrations", icon: "googlegemini" },
  { name: "Supabase", category: "Data & Storage", icon: "supabase" },
  { name: "Redux Toolkit", category: "Frontend & Mobile", icon: "redux" },
  { name: "Cloudflare", category: "Cloud & Deployment", icon: "cloudflare" },
  { name: "Jest", category: "Workflow & Testing", icon: "jest" },
  { name: "Sequelize", category: "Backend & APIs", icon: "sequelize" },
  { name: "JWT", category: "Backend & APIs", icon: "jsonwebtokens" },
  { name: "Apollo Client", category: "Client & Integrations", icon: "apollographql" },
  { name: "Apollo Server", category: "Backend & APIs", icon: "apollographql" },
  { name: "Axios", category: "Client & Integrations", icon: "axios" },
  { name: "Google OAuth", category: "Client & Integrations", icon: "google" },
  { name: "Google Places API", category: "Client & Integrations", icon: "googlemaps" },
  { name: "Groq", category: "Client & Integrations", icon: "groq" },
  { name: "Motion", category: "Frontend & Mobile", icon: "framer" },
  { name: "Bootstrap", category: "Frontend & Mobile", icon: "bootstrap" },
  { name: "DaisyUI", category: "Frontend & Mobile", icon: "daisyui" },
  { name: "EJS", category: "Frontend & Mobile", icon: "javascript" },
  { name: "bcryptjs", category: "Backend & APIs", icon: "npm" },
  { name: "TMDB API", category: "Client & Integrations", icon: "themoviedatabase" },
  { name: "Leaflet", category: "Client & Integrations", icon: "leaflet" },
  { name: "ImageKit", category: "Client & Integrations", icon: "imagekit" },
  { name: "Midtrans", category: "Client & Integrations", icon: "midtrans" },
  { name: "Supertest", category: "Workflow & Testing", icon: "jest" },
  { name: "Vitest", category: "Workflow & Testing", icon: "vitest" },
];

export type Project = {
  id: string;
  slug: string;
  index: string;
  year: string;
  category: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  coverPath: string;
  demoPath: string;
};

export const projects: Project[] = [
  {
    id: "shelter",
    slug: "shelter",
    index: "01",
    year: "Aug 2026",
    category: "E-commerce · Vape Store",
    title: "Shelter",
    summary:
      "Full-stack e-commerce platform with online payments, an admin CMS, and an AI-powered product recommendation chatbot.",
    highlights: [
      "Catalogue, cart, wishlist, checkout, order history, and role-based administration",
      "Google Gemini for text and image recommendations grounded in live product data",
      "Google OAuth, JWT auth, Midtrans payments, and transaction webhooks",
      "Jest & Supertest with ≥90% coverage; deployed on Vercel, AWS EC2, Supabase, Cloudflare",
    ],
    stack: [
      "React",
      "Redux Toolkit",
      "Express.js",
      "PostgreSQL",
      "Sequelize",
      "Gemini API",
      "Midtrans",
      "Jest",
      "AWS",
    ],
    coverPath: "/projects/shelter/cover.jpg",
    demoPath: "/projects/shelter/demo.mp4",
    liveUrl: "https://shelter.majubersamawira.xyz/",
  },
  {
    id: "mediflow",
    slug: "mediflow",
    index: "02",
    year: "Aug 2026",
    category: "Healthcare · Real-time",
    title: "MediFlow",
    summary:
      "Real-time hospital management portal supporting booking, live queues, consultations, payments, and post-visit chat.",
    highlights: [
      "React frontend in a three-person full-stack team",
      "Real-time clinic queues and doctor–patient chat with typing indicators & read receipts (Socket.IO)",
      "Quota-based booking, e-prescriptions, Midtrans payments, notifications, role-based UI",
      "Shared state for appointments, queues, chat, and notifications",
    ],
    stack: [
      "React",
      "Redux Toolkit",
      "Tailwind CSS",
      "Socket.IO",
      "REST API",
      "JWT",
      "Midtrans",
    ],
    coverPath: "/projects/mediflow/cover.jpg",
    demoPath: "/projects/mediflow/demo.mp4",
    liveUrl: "https://mediflow.majubersamawira.xyz/",
  },
  {
    id: "sereporsea",
    slug: "sereporsea",
    index: "03",
    year: "Sep 2026",
    category: "E-commerce · Luxury watches",
    title: "Sereporsea",
    summary:
      "Full-stack luxury-watch e-commerce catalogue optimized for search engines and interactive product discovery.",
    highlights: [
      "SSR for product pages and CSR for the interactive catalogue",
      "JWT auth with httpOnly cookies, bcrypt, and Zod validation",
      "Debounced search, filters, sorting, infinite scrolling, and persistent wishlist",
      "AbortController and request-ID guards to prevent stale/duplicate results",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "React Context",
      "Zod",
      "JWT",
    ],
    coverPath: "/projects/sereporsea/cover.jpg",
    demoPath: "/projects/sereporsea/demo.mp4",
    liveUrl: "https://sereporsea.vercel.app/",
  },
  {
    id: "dolan",
    slug: "dolan",
    index: "04",
    year: "Sep 2026",
    category: "Social Travel",
    title: "Dolan",
    summary:
      "Social travel platform for discovering destinations, planning itineraries, and finding travel companions.",
    highlights: [
      "Owned PostgreSQL layer: Sequelize migrations, models, constraints, indexes, seeders",
      "Google Places search, place details, popularity ranking, and public trip/template APIs",
      "Trip lifecycle: draft, publish, join/approval with capacity locking, and comments",
      "Release hardening with IDOR checks, concurrent approval tests, and rate limiting",
    ],
    stack: [
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Sequelize",
      "Zod",
      "Google Places API",
      "Vitest",
    ],
    coverPath: "/projects/dolan/cover.jpg",
    demoPath: "/projects/dolan/demo.mp4",
    liveUrl: "https://app.dolanan.my.id/",
  },
];

export const experience = [
  {
    id: "mikuni",
    period: "Jan 2022 — Jan 2026",
    role: "Operator Material Control",
    org: "PT Mikuni Indonesia",
    location: "Bekasi, Indonesia",
    highlights: [
      {
        id: "ops",
        title: "Warehouse operations",
        body: "Ran end-to-end flow for 500+ parts totaling 44 million pcs — receiving, putaway, storage, picking, packing, and returns on Oracle JD Edwards (JDE).",
      },
      {
        id: "kaizen",
        title: "Process improvement",
        body: "Led a Kaizen initiative that cut process cycle time by 57%, pairing data checks with clearer handoffs across the floor.",
      },
      {
        id: "collab",
        title: "Cross-team coordination",
        body: "Synced material requirements with Production, PPIC, and Purchasing so shortages and delays were caught before they hit the line.",
      },
      {
        id: "accuracy",
        title: "Inventory accuracy",
        body: "Applied FIFO and FEFO procedures, ran regular stock audits in Excel, and flagged abnormalities with consistent safety discipline.",
      },
    ],
    skills: [
      "Analytical thinking",
      "Process improvement",
      "Team coordination",
      "Problem solving",
      "Attention to detail",
    ],
  },
] as const;

export const education = [
  {
    id: "hacktiv8",
    index: "01",
    kind: "Immersive training",
    period: "Jun 2026 — Sep 2026",
    school: "Hacktiv8 Indonesia",
    program: "Full Stack JavaScript Immersive Program",
    detail:
      "Project-based training across interfaces, APIs, databases, real-time systems, payments, and AI integrations.",
    logo: "/logos/hacktiv8.png",
    logoAlt: "Hacktiv8 logo",
    statValue: "86",
    statLabel: "/ 100",
    current: false,
    links: [
      {
        label: "Certificate",
        href: "https://drive.google.com/file/d/1tCsNxdyxMelJ1K3gw30QN1vlrvbTG2jb/view?usp=sharing",
      },
      {
        label: "Transcript",
        href: "https://drive.google.com/file/d/1hQHKRbDNqdkp6sfykoVvTBGA-Vr26HLe/view?usp=sharing",
      },
    ],
  },
  {
    id: "binus",
    index: "02",
    kind: "University",
    period: "Aug 2023 — Aug 2027",
    school: "BINUS Online · Bina Nusantara University",
    program: "Bachelor of Computer Science",
    detail:
      "Online Computer Science degree — applying coursework directly to practical software projects. Current GPA 3.48 / 4.00.",
    logo: "/logos/binus-online.png",
    logoAlt: "BINUS Online logo",
    statValue: "3.48",
    statLabel: "GPA / 4.00",
    current: true,
  },
] as const;

export const certificates = [
  {
    id: "hr-se",
    org: "HackerRank",
    title: "Software Engineer Intern Certificate",
    date: "Sep 2026",
    href: "https://drive.google.com/file/d/1eDFraohpsm-Kx6VFFjsKEhTOstSM8C8p/view?usp=sharing",
  },
  {
    id: "hr-react",
    org: "HackerRank",
    title: "React Basic Certificate",
    date: "Sep 2026",
    href: "https://drive.google.com/file/d/1VDN7hUEVnfxLFUh66W212ebTmd7oge7A/view?usp=drive_link",
  },
  {
    id: "hr-js",
    org: "HackerRank",
    title: "JavaScript Basic Certificate",
    date: "Sep 2026",
    href: "https://drive.google.com/file/d/1oAhUKJnAydNA8N-aV_2gbvxA9WzHD2qp/view?usp=drive_link",
  },
  {
    id: "hr-ps",
    org: "HackerRank",
    title: "Problem Solving Certificate",
    date: "Sep 2026",
    href: "https://drive.google.com/file/d/1Powg8j18CHb7WE6otLZr2FgekgASdP-F/view?usp=drive_link",
  },
  {
    id: "hr-css",
    org: "HackerRank",
    title: "Basic CSS Certificate",
    date: "Sep 2026",
    href: "https://drive.google.com/file/d/1l6U-WiQCuu-26tSjpBZMbJ0ZqhTQzGo1/view?usp=drive_link",
  },
] as const;

export const navLinks = [
  { href: "#top", label: "Top" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
] as const;

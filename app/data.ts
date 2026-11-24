// Everything personal on the site lives in this file.
// Edit the values below and the whole portfolio updates. No need to touch the components.

import type { Brand } from "./components/icons/brands";

export type Skill = {
  name: string;
  image: string;
  invertInLight?: boolean; // for white logos that would disappear on light backgrounds
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Job = {
  company: string;
  role: string;
  location?: string;
  summary: string;
  highlights: string[];
  ongoing?: boolean;
};

export type Social = {
  platform: Extract<Brand, "github" | "linkedin" | "x" | "instagram" | "facebook" | "tiktok" | "youtube" | "whatsapp" | "dribbble" | "medium">;
  url: string;
};

export type ProjectLink = {
  label: string;
  url: string;
  kind: "web" | "ios" | "android" | "portal";
};

// One part of a product (e.g. the storefront, the vendor portal) with its screenshots.
export type ProjectScreen = {
  title: string;
  description: string;
  url?: string;
  desktop?: string;
  mobile?: string;
  // true if the site allows being shown inside an iframe, so visitors get a live preview.
  livePreview?: boolean;
};

// A native mobile app that belongs to a project, with its phone screenshots.
export type MobileApp = {
  title: string;
  description: string;
  screens: string[];
  links: ProjectLink[];
};

export type Project = {
  slug: string; // used in the page address: /projects/<slug>
  name: string;
  category: string;
  summary: string; // one sentence for the project card
  description: string[]; // paragraphs for the project page
  features: string[]; // what it does
  stack: {
    frameworks: string[];
    libraries: string[];
    technologies: string[];
  };
  links: ProjectLink[];
  badge?: string; // small label like "In development"
  company?: string;
  contributors?: string[];
  icon?: string;
  cover?: string; // card + share image; a styled placeholder is shown if missing
  screens?: ProjectScreen[];
  mobileApps?: MobileApp[];
};

export const site = {
  name: "Obinna Justice",
  initials: "OJ",
  role: "Senior Mobile Engineer",
  tagline:
    "I build high-performance cross-platform mobile apps with React Native and Flutter, plus React and Next.js web dashboards.",
  email: "obitechhq@gmail.com",
  phone: "+234 903 073 4697",
  location: "Abuja, Nigeria",

  // Your photo (About section and menu logo) and CV, both in /public. Leave photo empty to show your initials.
  photo: "/me.jpg",
  resume: "/Justice-Obinna-CV.pdf",
};

// Add your profiles here, e.g. { platform: "github", url: "https://github.com/your-username" }.
// Supported: github, linkedin, x, instagram, facebook, tiktok, youtube, whatsapp, dribbble, medium.
export const socials: Social[] = [];

export const about = [
  "I’m a mobile engineer with 5+ years of experience building high-performance cross-platform apps for fintech, mobility and e-commerce, using React Native, Flutter, GraphQL and modern state-management tools.",
  "I specialise in identity verification (KYC), mobile payments, real-time location systems, secure authentication and scalable UI architecture. I’m known for clean, modular, maintainable code and for shipping fast, intuitive, production-ready apps on Android and iOS. I also build React and Next.js web dashboards.",
];

export const facts = [
  { label: "Experience", value: "5+ years" },
  { label: "Focus", value: "Cross-platform mobile apps" },
  { label: "Core stack", value: "React Native, Flutter, Next.js" },
  { label: "Based in", value: "Abuja, Nigeria" },
];

export const experience: Job[] = [
  {
    company: "Softnet",
    role: "Mobile Developer",
    summary:
      "Building NetPay, a fintech wallet app for transfers, bill payments and currency exchange, using React Native, Expo, Zustand and React Query.",
    highlights: [
      "Integrated Prembly identity verification into tiered KYC: BVN, ID document capture and selfie liveness checks",
      "Integrated Fincra and Flutterwave for wallet funding and account transactions",
      "Built real-time customer support chat over WebSockets",
      "Built the transaction PIN keypad and account security settings",
      "Added push notifications, dark mode and multi-language support (English, French, Spanish)",
    ],
    ongoing: true,
  },
  {
    company: "Achrams Limited",
    role: "Senior Mobile Engineer",
    location: "Remote",
    summary:
      "Developed rider and driver apps for a ride-hailing platform similar to Uber and inDrive using Flutter, GetX, GetStorage and Firebase.",
    highlights: [
      "Integrated Google Maps, Geolocator, Directions API and Places API",
      "Built trip lifecycle features: ride creation, driver acceptance and live tracking",
      "Implemented secure Paystack payment flows and modular, scalable UI components",
      "Integrated backend APIs for authentication, ride management and real-time updates",
    ],
  },
  {
    company: "Deep Technology Limited",
    role: "Senior Mobile Engineer",
    location: "Abuja, Nigeria",
    summary:
      "Built secure, scalable mobile apps for real-estate and gaming platforms using React Native, GraphQL, Apollo Client and Zustand.",
    highlights: [
      "Developed full authentication flows: sign-up, login, OTP and password recovery",
      "Integrated Paystack for secure mobile payments across multiple channels",
      "Built real-time notification systems using GraphQL triggers",
      "Implemented wallet management: funding, withdrawals and transaction history",
      "Improved performance and reliability with fewer re-renders, error boundaries, retry logic and fallback screens",
    ],
  },
  {
    company: "E-Commerce System",
    role: "Senior Mobile Engineer",
    location: "Remote",
    summary:
      "Building a complete e-commerce mobile platform using React Native, Expo, Zustand and Tailwind CSS.",
    highlights: [
      "Developed product listing, favourites, cart, checkout and order history",
      "Integrated Flutterwave for secure payments",
      "Implemented Google Maps for delivery address selection and order tracking",
      "Added push notifications for order updates and promotions",
      "Designed reusable components, optimised state persistence and used custom hooks for API calls",
    ],
    ongoing: true,
  },
  {
    company: "Angala Technologies (Payrail Agency)",
    role: "Frontend Engineer (Web)",
    summary: "Rebuilt the admin web portal for an agent-banking network using Next.js, React and Material UI.",
    highlights: [
      "Built two-factor sign-in, the POS terminal lifecycle and tiered agent KYC review",
      "Built transaction follow-up tools: requery, settling pending transfers and bills, and reconciliation insights",
    ],
  },
];

export const skillsIntro =
  "I build cross-platform mobile apps with React Native and Flutter, backed by solid state management and GraphQL or REST APIs. Along the way I’ve integrated identity verification, mobile payments, real-time chat and notifications, and maps and location services, and shipped to both the Play Store and the App Store.";

// The 3D carousel. Icons live in /public/skills.
export const skills: Skill[] = [
  { name: "React Native", image: "/skills/react.svg" },
  { name: "Flutter", image: "/skills/flutter.svg" },
  { name: "Dart", image: "/skills/dart.svg" },
  { name: "TypeScript", image: "/skills/typescript.svg" },
  { name: "JavaScript", image: "/skills/javascript.svg" },
  { name: "Expo", image: "/skills/expo.svg", invertInLight: true },
  { name: "Firebase", image: "/skills/firebase.svg" },
  { name: "GraphQL", image: "/skills/graphql.svg" },
  { name: "Next.js", image: "/skills/nextjs.svg", invertInLight: true },
  { name: "Tailwind CSS", image: "/skills/tailwindcss.svg" },
];

// Grouped skill tags under the carousel.
export const skillGroups: SkillGroup[] = [
  { title: "State & data", items: ["Zustand", "React Query", "GetX", "Riverpod", "Provider", "Hive", "Apollo Client"] },
  { title: "APIs & real-time", items: ["GraphQL", "REST APIs", "WebSockets", "Push notifications", "Real-time data"] },
  { title: "Payments & KYC", items: ["Paystack", "Flutterwave", "Fincra", "Prembly KYC"] },
  { title: "Maps & location", items: ["Google Maps API", "Location services"] },
  { title: "Web", items: ["React", "Next.js", "Tailwind CSS", "NativeWind", "Material UI"] },
  { title: "Tools & stores", items: ["Git", "GitHub", "GitLab", "Bitbucket", "Postman", "Play Store", "App Store"] },
];

export const projects: Project[] = [
  {
    slug: "achrams",
    name: "ACHRAMS",
    category: "Mobility · Flutter apps for iOS & Android",
    summary:
      "Ride-hailing apps for Nigeria’s FAAN-approved airport car-hire platform: a passenger app and a driver app with live trip tracking, built with Flutter.",
    description: [
      "ACHRAMS is the official airport car-hire platform approved by the Federal Airports Authority of Nigeria (FAAN). It gives travellers a safe way to book a ride from the airport, with verified drivers, official pickup points and transparent fares. It’s live at Lagos and Abuja airports.",
      "I built the passenger and driver apps with Flutter, GetX, GetStorage and Firebase: the full trip lifecycle from ride creation to driver acceptance and live tracking, Google Maps with the Directions and Places APIs, Paystack payment flows, and secure sign-in with persistent sessions.",
    ],
    features: [
      "Full trip lifecycle: ride creation, driver acceptance and live tracking",
      "Live maps and routing with Google Maps, Geolocator, and the Directions and Places APIs",
      "A unique security code on every trip so passengers can verify their driver before boarding",
      "One-tap trip alert that notifies ACHRAMS support, FAAN security and emergency contacts",
      "Upfront fare estimates with no surge pricing, and secure Paystack payment flows",
      "Wheelchair-accessible vehicles, large luggage, group vehicles and elderly assistance",
      "Fair first-come-first-served airport queue for drivers, with their live position",
      "Trip requests showing fare, destination and security code, with accept or reject",
      "Driver wallet, earnings dashboard, trip history, ratings and performance insights",
      "Secure authentication and session persistence with GetX and GetStorage",
    ],
    stack: {
      frameworks: ["Flutter"],
      libraries: ["GetX", "GetStorage", "Geolocator"],
      technologies: ["Dart", "Firebase", "Google Maps API", "Directions & Places APIs", "Paystack"],
    },
    links: [
      { label: "Passenger app · App Store", url: "https://apps.apple.com/sr/app/faan-achrams-passenger/id6762305872", kind: "ios" },
      { label: "Passenger app · Google Play", url: "https://play.google.com/store/apps/details?id=com.achrams.ride1", kind: "android" },
      { label: "Driver app · Google Play", url: "https://play.google.com/store/apps/details?id=com.achrams.driver", kind: "android" },
    ],
    company: "Achrams Limited",
    icon: "/projects/achrams/icon.png",
    cover: "/projects/achrams/cover.jpg",
    mobileApps: [
      {
        title: "Passenger app",
        description: "Book a verified airport ride, check your driver’s security code and track the trip live.",
        screens: [1, 2, 3, 4, 5, 6].map((n) => `/projects/achrams/passenger-${n}.jpg`),
        links: [
          { label: "App Store", url: "https://apps.apple.com/sr/app/faan-achrams-passenger/id6762305872", kind: "ios" },
          { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.achrams.ride1", kind: "android" },
        ],
      },
      {
        title: "Driver app",
        description: "Join the airport queue, accept trips, navigate to pickup and manage your wallet and earnings.",
        screens: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/projects/achrams/driver-${n}.jpg`),
        links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.achrams.driver", kind: "android" }],
      },
    ],
  },
  {
    slug: "pnuel",
    name: "Pnuel",
    category: "Proptech · React Native app for iOS & Android",
    summary:
      "A real-estate investment app: buy property in instalments, co-invest with others and track returns. Built with React Native and GraphQL.",
    description: [
      "Pnuel Group is a family of companies spanning real estate, agribusiness and investments. Its customers buy, sell and invest in property across Nigeria with flexible payment plans.",
      "At Deep Technology I built the Pnuel mobile app for iOS and Android with React Native, GraphQL, Apollo Client and Zustand, covering authentication with OTP, Paystack payments, in-app wallets and real-time notifications. It’s published on the App Store and Google Play.",
    ],
    features: [
      "Browse residential and commercial properties and buy with flexible instalment plans",
      "Co-invest in properties with other investors, starting from ₦500,000",
      "Full authentication: sign-up, login, OTP verification and password recovery",
      "In-app wallet with funding, withdrawals and transaction history",
      "Secure Paystack payments across multiple channels",
      "Real-time notifications powered by GraphQL triggers",
      "Investor dashboard showing total investment, returns, average ROI and active properties",
      "Realtor programme with referral links, sales verification and revenue tracking",
      "Reliability work: fewer re-renders, error boundaries, retry logic and fallback screens",
    ],
    stack: {
      frameworks: ["React Native"],
      libraries: ["Apollo Client", "Zustand"],
      technologies: ["GraphQL", "Paystack", "Push notifications"],
    },
    links: [
      { label: "App Store", url: "https://apps.apple.com/ng/app/pnuel/id6748348608", kind: "ios" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.pnuel.www", kind: "android" },
      { label: "Pnuel Group website", url: "https://pnuelgroup.com/", kind: "web" },
    ],
    company: "Deep Technology Limited",
    contributors: ["Obinna", "Emake"],
    icon: "/projects/pnuel/icon.png",
    cover: "/projects/pnuel/app-cover.jpg",
    mobileApps: [
      {
        title: "Pnuel app",
        description: "Browse listings, invest and track your portfolio on iOS and Android.",
        screens: [1, 2, 3, 4, 5, 6].map((n) => `/projects/pnuel/app-${n}.jpg`),
        links: [
          { label: "App Store", url: "https://apps.apple.com/ng/app/pnuel/id6748348608", kind: "ios" },
          { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.pnuel.www", kind: "android" },
        ],
      },
    ],
    screens: [
      {
        title: "Group website",
        description: "The home of Pnuel Group, linking every company and service in one place.",
        url: "https://pnuelgroup.com/",
        desktop: "/projects/pnuel/website-desktop.jpg",
        mobile: "/projects/pnuel/website-mobile.jpg",
        livePreview: true,
      },
      {
        title: "Pnuel Real Estate",
        description: "Property listings, investment opportunities and flexible payment plans.",
        url: "https://pnuelgroup.com/real-estate",
        desktop: "/projects/pnuel/real-estate-desktop.jpg",
        livePreview: true,
      },
      {
        title: "Pnuel Agro (PAPI)",
        description: "Managed farmland estates where investors earn a 70/30 seasonal profit share.",
        url: "https://pnuelgroup.com/agro",
        desktop: "/projects/pnuel/agro-desktop.jpg",
        livePreview: true,
      },
    ],
  },
  {
    slug: "netpay",
    name: "NetPay",
    category: "Fintech · React Native wallet app",
    summary:
      "A fintech wallet app for transfers, bill payments and currency exchange, with tiered KYC and real-time support chat. In development at Softnet.",
    description: [
      "NetPay is a mobile wallet that brings everyday money tasks into one app: sending money, paying bills and exchanging currency.",
      "I’m building it at Softnet with React Native and Expo, so a single codebase runs on both iOS and Android, with Zustand and React Query managing state and server data. The app hasn’t been published yet.",
    ],
    features: [
      "Transfers, bill payments and currency exchange from one wallet",
      "Tiered KYC with Prembly: BVN, ID document capture and selfie liveness checks",
      "Wallet funding and account transactions through Fincra and Flutterwave",
      "Real-time customer support chat over WebSockets",
      "Transaction PIN keypad and account security settings",
      "Push notifications, dark mode and English, French and Spanish languages",
    ],
    stack: {
      frameworks: ["React Native", "Expo"],
      libraries: ["Zustand", "React Query"],
      technologies: ["Prembly KYC", "Fincra", "Flutterwave", "WebSockets", "Push notifications"],
    },
    links: [],
    badge: "In development",
    company: "Softnet",
  },
  {
    slug: "payrail",
    name: "Payrail Agency Banking",
    category: "Fintech · Next.js admin portal",
    summary:
      "The rebuilt admin portal for an agent-banking network: POS terminals, agent KYC, transactions and settlements, all in one place.",
    description: [
      "Payrail is an agency-banking platform that lets agents offer banking services to their communities through POS terminals.",
      "I rebuilt its admin web portal, the control room for the agent network, with Next.js, React and Material UI. Operations staff use it to manage terminals, review agents, and follow every transaction through to settlement.",
    ],
    features: [
      "Two-factor sign-in for staff",
      "The full POS terminal lifecycle: assigning, tracking and managing terminals",
      "Tiered agent KYC review for onboarding and verification",
      "Transaction follow-up tools: requery, and settling pending transfers and bills",
      "Reconciliation insights across transactions and settlements",
    ],
    stack: {
      frameworks: ["Next.js", "React"],
      libraries: ["Material UI", "Tailwind CSS"],
      technologies: ["Two-factor authentication", "Cloudflare Turnstile"],
    },
    links: [{ label: "Open admin portal", url: "https://payrailadm.angalafintech.com/", kind: "portal" }],
    company: "Angala Technologies",
    cover: "/projects/payrail/admin-desktop.jpg",
    screens: [
      {
        title: "Admin sign-in",
        description: "Staff sign in with their username or email. The dashboard behind it is private.",
        url: "https://payrailadm.angalafintech.com/",
        desktop: "/projects/payrail/admin-desktop.jpg",
        mobile: "/projects/payrail/admin-mobile.jpg",
      },
    ],
  },
  {
    slug: "polnyy",
    name: "Polnyy",
    category: "E-commerce marketplace · 3 web apps",
    summary:
      "A multi-vendor fashion marketplace for the UAE, with a customer storefront, a vendor portal for brands and an admin portal for the team.",
    description: [
      "Polnyy is an online fashion marketplace for the UAE where independent brands sell directly to shoppers.",
      "It’s made up of three connected apps: the storefront customers shop on, a vendor portal where brands run their stores, and an admin portal the Polnyy team uses to manage the marketplace.",
    ],
    features: [
      "Storefront with new arrivals, best sellers, sale items and curated collections",
      "Wishlist, cart and customer accounts, with prices in UAE dirhams (AED)",
      "Secure online payments with Stripe",
      "Vendor portal where brands manage products, track orders and view sales analytics",
      "Admin portal for the team running the marketplace",
      "Responsive layouts for shopping on any device",
    ],
    stack: {
      frameworks: ["Next.js 16", "React"],
      libraries: ["Tailwind CSS", "Zustand", "Radix UI", "Lucide icons", "Sonner"],
      technologies: ["Turbopack", "Stripe", "Cloudflare"],
    },
    links: [
      { label: "Visit storefront", url: "https://polnyy.com/", kind: "web" },
      { label: "Vendor portal", url: "https://vendor.polnyy.com/", kind: "portal" },
      { label: "Admin portal", url: "https://admin.polnyy.com/", kind: "portal" },
    ],
    cover: "/projects/polnyy/store-desktop.jpg",
    screens: [
      {
        title: "Customer storefront",
        description: "Where shoppers browse collections, save favourites and check out.",
        url: "https://polnyy.com/",
        desktop: "/projects/polnyy/store-desktop.jpg",
        mobile: "/projects/polnyy/store-mobile.jpg",
        livePreview: true,
      },
      {
        title: "Vendor portal",
        description: "Brands sign in to manage products, follow orders and see how their store is doing.",
        url: "https://vendor.polnyy.com/",
        desktop: "/projects/polnyy/vendor-desktop.jpg",
        mobile: "/projects/polnyy/vendor-mobile.jpg",
        livePreview: true,
      },
      {
        title: "Admin portal",
        description: "The control panel the Polnyy team uses to run the marketplace.",
        url: "https://admin.polnyy.com/",
        desktop: "/projects/polnyy/admin-desktop.jpg",
        mobile: "/projects/polnyy/admin-mobile.jpg",
        livePreview: true,
      },
    ],
  },
  {
    slug: "master-builder",
    name: "Master Builder",
    category: "Construction · Web app",
    summary: "A construction-based platform that handles government roads, houses, and bridges.",
    description: [
      "Master Builder is a construction-based platform for managing government infrastructure projects: roads, houses and bridges.",
    ],
    features: ["Manage government road, housing and bridge projects in one platform"],
    stack: {
      frameworks: ["Nuxt.js"],
      libraries: ["Nuxt UI", "Tailwind CSS"],
      technologies: ["TypeScript"],
    },
    links: [{ label: "Visit app", url: "https://app.skaldongroup.com", kind: "web" }],
    company: "Swizel Ltd",
    contributors: ["Obinna", "Emake"],
  },

  // Waiting for details: agg.angalafintech.com was down (SSL error) when this was built.
  // Copy the shape of the projects above to add it, or any new project.
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type EventItem = {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  dateLabel: string;
  day: string;
  month: string;
  live?: boolean;
  visual: string;
};

export type Speaker = {
  id: string;
  name: string;
  role: string;
  bio: string;
  links: string[];
  avatar: string;
};

export type Session = {
  id: string;
  eventId: string;
  title: string;
  description: string;
  start: string;
  end: string;
  room: string;
  capacity: number;
  speakerIds: string[];
  live?: boolean;
};

export const events: EventItem[] = [
  {
    id: "tech-summit-paris-2025",
    title: "Tech Summit Paris 2025",
    description: "The meeting point for tech and innovation leaders.",
    city: "Paris",
    country: "France",
    dateLabel: "June 12 - 14, 2025",
    day: "12",
    month: "JUN",
    live: true,
    visual: "from-fuchsia-700 via-event-primary to-blue-950",
  },
  {
    id: "ux-design-conference",
    title: "UX Design Conference",
    description: "3 days to explore the future of design and user experience.",
    city: "Lyon",
    country: "France",
    dateLabel: "August 22 - 24, 2025",
    day: "22",
    month: "AUG",
    visual: "from-amber-900 via-stone-800 to-event-bg-soft",
  },
  {
    id: "ai-data-workshop",
    title: "AI & Data Workshop",
    description: "Hands-on workshops around artificial intelligence and data.",
    city: "Bordeaux",
    country: "France",
    dateLabel: "10 - 11 Oct. 2025",
    day: "10",
    month: "OCT.",
    visual: "from-blue-950 via-event-blue to-event-bg",
  },
  {
    id: "future-work-summit",
    title: "Future of Work Summit",
    description: "Rethinking work in the digital era.",
    city: "Lille",
    country: "France",
    dateLabel: "05 - 06 Nov. 2025",
    day: "05",
    month: "NOV.",
    visual: "from-purple-950 via-event-primary to-event-bg-soft",
  },
];

export const speakers: Speaker[] = [
  {
    id: "claire-martin",
    name: "Claire Martin",
    role: "Generative AI Expert",
    bio: "Claire helps companies responsibly integrate generative AI and transform ways of working.",
    links: ["LinkedIn", "Website"],
    avatar: "CM",
  },
  {
    id: "nina-dubois",
    name: "Nina Dubois",
    role: "Lead UX Researcher",
    bio: "Nina designs user-centered digital experiences for international SaaS products.",
    links: ["LinkedIn", "Portfolio"],
    avatar: "ND",
  },
  {
    id: "hugo-bernard",
    name: "Hugo Bernard",
    role: "Data Strategist",
    bio: "Hugo helps product teams use their data to make better decisions.",
    links: ["LinkedIn", "X"],
    avatar: "HB",
  },
];

export const sessions: Session[] = [
  {
    id: "ia-generative",
    eventId: "tech-summit-paris-2025",
    title: "The future of generative AI",
    description: "A clear session on the uses, limits, and opportunities of generative AI for organizations.",
    start: "10:15",
    end: "11:00",
    room: "Room A",
    capacity: 240,
    speakerIds: ["claire-martin"],
    live: true,
  },
  {
    id: "design-system",
    eventId: "ux-design-conference",
    title: "Building a sustainable design system",
    description: "Methods and components to harmonize an interface at scale.",
    start: "11:15",
    end: "12:00",
    room: "Room B",
    capacity: 160,
    speakerIds: ["nina-dubois"],
  },
  {
    id: "data-products",
    eventId: "ai-data-workshop",
    title: "Creating useful data products",
    description: "How to transform raw data into concrete services for users.",
    start: "14:00",
    end: "15:30",
    room: "Room C",
    capacity: 120,
    speakerIds: ["hugo-bernard"],
  },
  {
    id: "future-work",
    eventId: "future-work-summit",
    title: "Collaborating in hybrid work",
    description: "Organization, rituals, and tools to keep a team aligned.",
    start: "16:00",
    end: "17:00",
    room: "Room A",
    capacity: 200,
    speakerIds: ["claire-martin", "nina-dubois"],
  },
];

export const rooms = ["Room A", "Room B", "Room C"];

export const getEvent = (id: string) => events.find((event) => event.id === id) ?? events[0];
export const getSession = (id: string) =>
  sessions.find((session) => session.id === id) ?? sessions[0];
export const getSpeaker = (id: string) =>
  speakers.find((speaker) => speaker.id === id) ?? speakers[0];
export const getSpeakerNames = (speakerIds: string[]) =>
  speakerIds
    .map((id) => speakers.find((speaker) => speaker.id === id)?.name)
    .filter(Boolean)
    .join(" • ");

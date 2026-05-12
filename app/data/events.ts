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
    description: "Le rendez-vous des leaders tech et de l'innovation.",
    city: "Paris",
    country: "France",
    dateLabel: "12 - 14 Juin 2025",
    day: "12",
    month: "JUIN",
    live: true,
    visual: "from-fuchsia-700 via-event-primary to-blue-950",
  },
  {
    id: "ux-design-conference",
    title: "UX Design Conference",
    description: "3 jours pour explorer le futur du design et de l'expérience utilisateur.",
    city: "Lyon",
    country: "France",
    dateLabel: "22 - 24 Août 2025",
    day: "22",
    month: "AOÛT",
    visual: "from-amber-900 via-stone-800 to-event-bg-soft",
  },
  {
    id: "ai-data-workshop",
    title: "AI & Data Workshop",
    description: "Ateliers pratiques autour de l'intelligence artificielle et des données.",
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
    description: "Repenser le travail à l'ère du numérique.",
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
    role: "Experte IA générative",
    bio: "Claire accompagne les entreprises dans l'intégration responsable de l'IA générative et la transformation des méthodes de travail.",
    links: ["LinkedIn", "Site web"],
    avatar: "CM",
  },
  {
    id: "nina-dubois",
    name: "Nina Dubois",
    role: "Lead UX Researcher",
    bio: "Nina conçoit des expériences numériques centrées utilisateur pour des produits SaaS internationaux.",
    links: ["LinkedIn", "Portfolio"],
    avatar: "ND",
  },
  {
    id: "hugo-bernard",
    name: "Hugo Bernard",
    role: "Data Strategist",
    bio: "Hugo aide les équipes produit à exploiter leurs données pour prendre de meilleures décisions.",
    links: ["LinkedIn", "X"],
    avatar: "HB",
  },
];

export const sessions: Session[] = [
  {
    id: "ia-generative",
    eventId: "tech-summit-paris-2025",
    title: "L'avenir de l'IA générative",
    description: "Une session claire sur les usages, limites et opportunités de l'IA générative pour les organisations.",
    start: "10:15",
    end: "11:00",
    room: "Salle A",
    capacity: 240,
    speakerIds: ["claire-martin"],
    live: true,
  },
  {
    id: "design-system",
    eventId: "ux-design-conference",
    title: "Construire un design system durable",
    description: "Méthodes et composants pour harmoniser une interface à grande échelle.",
    start: "11:15",
    end: "12:00",
    room: "Salle B",
    capacity: 160,
    speakerIds: ["nina-dubois"],
  },
  {
    id: "data-products",
    eventId: "ai-data-workshop",
    title: "Créer des produits data utiles",
    description: "Comment transformer des données brutes en services concrets pour les utilisateurs.",
    start: "14:00",
    end: "15:30",
    room: "Salle C",
    capacity: 120,
    speakerIds: ["hugo-bernard"],
  },
  {
    id: "future-work",
    eventId: "future-work-summit",
    title: "Collaborer dans le travail hybride",
    description: "Organisation, rituels et outils pour garder une équipe alignée.",
    start: "16:00",
    end: "17:00",
    room: "Salle A",
    capacity: 200,
    speakerIds: ["claire-martin", "nina-dubois"],
  },
];

export const rooms = ["Salle A", "Salle B", "Salle C"];

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

"use client";

import { useEffect, useRef } from "react";

type EventCard = {
  id: number;
  day: string;
  month: string;
  title: string;
  description: string;
  location: string;
  date: string;
  live?: boolean;
  background: string;
};

const events: EventCard[] = [
  {
    id: 1,
    day: "12",
    month: "JUIN",
    title: "Tech Summit Paris 2025",
    description: "Le rendez-vous des leaders tech et de l’innovation.",
    location: "Paris, France",
    date: "12 - 14 Juin 2025",
    live: true,
    background:
      "/home-ger.png"
  },
  {
    id: 2,
    day: "22",
    month: "AOÛT",
    title: "UX Design Conference",
    description:
      "3 jours pour explorer le futur du design et de l’expérience utilisateur.",
    location: "Lyon, France",
    date: "22 - 24 Août 2025",
    background:
      "linear-gradient(135deg, rgba(164, 91, 40, 0.92), rgba(20, 13, 18, 0.98)), radial-gradient(circle at 70% 25%, rgba(255,197,129,0.34), transparent 38%)",
  },
  {
    id: 3,
    day: "10",
    month: "OCT.",
    title: "AI & Data Workshop",
    description:
      "Ateliers pratiques autour de l’intelligence artificielle et des données.",
    location: "Bordeaux, France",
    date: "10 - 11 Oct. 2025",
    background:
      "linear-gradient(135deg, rgba(14, 83, 185, 0.94), rgba(5, 17, 48, 0.98)), radial-gradient(circle at 70% 28%, rgba(87,180,255,0.38), transparent 38%)",
  },
  {
    id: 4,
    day: "05",
    month: "NOV.",
    title: "Future of Work Summit",
    description: "Repenser le travail à l’ère du numérique.",
    location: "Lille, France",
    date: "05 - 06 Nov. 2025",
    background:
      "linear-gradient(135deg, rgba(159, 42, 226, 0.94), rgba(22, 9, 42, 0.98)), radial-gradient(circle at 72% 22%, rgba(255,122,244,0.34), transparent 38%)",
  },
  {
    id: 5,
    day: "18",
    month: "NOV.",
    title: "Cloud & DevOps Days",
    description:
      "Infrastructure, automatisation et plateformes cloud modernes.",
    location: "Marseille, France",
    date: "18 - 20 Nov. 2025",
    background:
      "linear-gradient(135deg, rgba(45,102,255,0.92), rgba(11,18,58,0.98)), radial-gradient(circle at 28% 20%, rgba(165,205,255,0.38), transparent 36%)",
  },
  {
    id: 6,
    day: "03",
    month: "DÉC.",
    title: "Cyber Security Forum",
    description:
      "Protection des systèmes, des données et des infrastructures critiques.",
    location: "Toulouse, France",
    date: "03 - 04 Déc. 2025",
    background:
      "linear-gradient(135deg, rgba(102,25,190,0.96), rgba(8,10,28,0.99)), radial-gradient(circle at 58% 30%, rgba(205,110,255,0.34), transparent 36%)",
  },
  {
    id: 7,
    day: "11",
    month: "JAN.",
    title: "Startup Growth Meetup",
    description:
      "Stratégies, financement et retours d’expérience entrepreneuriaux.",
    location: "Nantes, France",
    date: "11 Jan. 2026",
    background:
      "linear-gradient(135deg, rgba(213,62,130,0.88), rgba(32,10,35,0.98)), radial-gradient(circle at 45% 24%, rgba(255,166,215,0.30), transparent 35%)",
  },
  {
    id: 8,
    day: "24",
    month: "FÉV.",
    title: "Digital Product Expo",
    description:
      "Produits digitaux, innovation et expériences utilisateur ambitieuses.",
    location: "Nice, France",
    date: "24 - 25 Fév. 2026",
    background:
      "linear-gradient(135deg, rgba(49,84,207,0.92), rgba(13,15,44,0.98)), radial-gradient(circle at 70% 35%, rgba(120,180,255,0.33), transparent 36%)",
  },
];

export default function Page() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    carouselRef.current?.scrollBy({
      left: direction === "right" ? 390 : -390,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      const carousel = carouselRef.current;

      if (!carousel) {
        return;
      }

      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScrollLeft - 10) {
        carousel.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        return;
      }

      carousel.scrollBy({
        left: 390,
        behavior: "smooth",
      });
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="min-h-[calc(100vh-76px)]">
      <section className="relative h-full min-h-[470px] overflow-hidden border-b border-white/5 bg-[#050817]">
        {/* Effets de lumière uniquement sur la partie gauche */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(circle_at_45%_30%,rgba(76,54,194,0.22),transparent_52%)]" />

        <div className="relative mx-auto grid h-full w-full grid-cols-1 pl-12 lg:grid-cols-[46%_54%]">
          {/* Partie gauche */}
          <div className="z-10 flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-0 lg:pl-2">
            {/* Badge */}
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-200">
              <CalendarIcon />
              Plateforme d’événements
            </div>

            {/* Titre */}
            <h1 className="max-w-[520px] text-[42px] font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-[56px] lg:text-[58px]">
              Vivez chaque <br />
              événement <br />
              <span className="bg-gradient-to-r from-[#b86cff] to-[#8b5cf6] bg-clip-text text-transparent">
                en temps réel.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[520px] text-[15px] leading-7 text-slate-300">
              Découvrez des conférences inspirantes, des ateliers pratiques et
              interagissez en direct avec les intervenants et la communauté.
            </p>

            {/* Barre de recherche */}
            <div className="mt-7 flex h-[58px] w-full max-w-[575px] items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
              <SearchIcon />

              <input
                type="text"
                placeholder="Rechercher un événement, un sujet, un intervenant..."
                className="min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-slate-400 outline-none"
              />

              <button className="h-[42px] shrink-0 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6d4dff] px-5 text-[14px] font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.36)] transition hover:brightness-110">
                Rechercher
              </button>
            </div>

            {/* Petits avantages */}
            <div className="mt-7 grid max-w-[650px] grid-cols-1 gap-5 sm:grid-cols-3">
              <FeatureItem
                icon={<MiniCalendarIcon />}
                title="Programme en temps réel"
                text="Ne manquez aucune session"
              />

              <FeatureItem
                icon={<ChatIcon />}
                title="Interaction en direct"
                text="Posez vos questions live"
              />

              <FeatureItem
                icon={<StarIcon />}
                title="Votre itinéraire"
                text="Ajoutez vos sessions favorites"
              />
            </div>
          </div>

          {/* Partie droite */}
          <div className="relative hidden lg:block">
            {/* Image / zone visuelle */}
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_55%_18%,rgba(64,79,255,0.62),transparent_28%),radial-gradient(circle_at_80%_34%,rgba(123,55,255,0.45),transparent_30%),linear-gradient(90deg,rgba(5,8,23,1)_0%,rgba(5,8,23,0.25)_22%,rgba(5,8,23,0.12)_100%)]"
              style={{
                backgroundImage: "url('/home-ger.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Transition entre le fond gauche et l'image */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#050817_0%,rgba(5,8,23,0.92)_8%,rgba(5,8,23,0.55)_18%,rgba(5,8,23,0.12)_32%,transparent_45%)]" />

            {/* Carte session live */}
            <div className="absolute bottom-[28px] right-[26px] w-[355px] rounded-[22px] border border-white/20 bg-[#0b0c1f]/55 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.52)] backdrop-blur-[18px]">
              <div className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.06em] text-slate-200">
                <span className="h-2 w-2 rounded-full bg-[#ff4d6d]" />
                En ce moment
              </div>

              <h2 className="text-[20px] font-bold leading-tight text-white">
                L’avenir de l’IA générative
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-slate-300">
                <span className="flex items-center gap-2">
                  <UserIcon />
                  Claire Martin
                </span>

                <span className="flex items-center gap-2">
                  <PinIcon />
                  Salle A
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[13px] text-slate-300">
                <ClockIcon />
                10:15 - 11:00
              </div>

              <button className="mt-6 flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-[#b65cff]/70 bg-white/[0.01] text-[14px] font-semibold text-white transition hover:bg-white/[0.06]">
                <ArrowIcon />
                Voir la session en direct
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section événements à venir */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#09101f] py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(76,54,194,0.14),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(88,28,255,0.12),transparent_34%)]" />

        <div className="relative mx-auto w-full px-6 lg:px-[88px]">
          <div className="mb-5 flex items-end justify-between gap-6">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-300">
                <UpcomingCalendarIcon />
                Événements à venir
              </div>

              <h2 className="text-[25px] font-bold tracking-[-0.03em] text-white">
                Explorez les prochains événements
              </h2>
            </div>


          </div>

          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {events.map((event) => (
                <article
                  key={event.id}
                  className="group w-[340px] shrink-0 overflow-hidden rounded-[18px] border border-white/15 bg-[#111827]/85 shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[#a855f7]/45"
                >
                  <div
                    className="relative h-[122px] overflow-hidden"
                    style={{
                      backgroundImage: `url(${event.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.24))]" />

                    <div className="absolute left-4 top-4 flex h-[58px] w-[56px] flex-col items-center justify-center rounded-[10px] border border-[#b15cff] bg-[#11152d]/80 shadow-[0_10px_25px_rgba(0,0,0,0.38)] backdrop-blur-md">
                      <span className="text-[22px] font-bold leading-none text-white">
                        {event.day}
                      </span>
                      <span className="mt-1 text-[10px] font-semibold text-white">
                        {event.month}
                      </span>
                    </div>

                    {event.live && (
                      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#ff4d6d] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Live
                      </div>
                    )}

                    <div className="absolute -bottom-8 right-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                  </div>

                  <div className="p-4">
                    <h3 className="text-[16px] font-bold text-white">
                      {event.title}
                    </h3>

                    <p className="mt-2 min-h-[44px] text-[13px] leading-5 text-slate-300">
                      {event.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-slate-300">
                      <span className="flex items-center gap-2">
                        <CardPinIcon />
                        {event.location}
                      </span>

                      <span className="flex items-center gap-2">
                        <CardCalendarIcon />
                        {event.date}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              aria-label="Voir les événements précédents"
              className="absolute -left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151c2c]/95 text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition hover:border-[#a855f7]/50 hover:bg-[#20283b] xl:flex"
            >
              <ArrowLeftCarouselIcon />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              aria-label="Voir les événements suivants"
              className="absolute -right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151c2c]/95 text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition hover:border-[#a855f7]/50 hover:bg-[#20283b] xl:flex"
            >
              <ArrowRightCarouselIcon />
            </button>
          </div>
        </div>
      </section>
      {/* Bande de présentation EventSync */}
      <section className="bg-[#08101f] pb-6">
        <div className="mx-auto w-full max-w-[1360px] px-6 lg:px-0">
          <div className="flex flex-col gap-8 rounded-[22px] border border-[#9b59ff]/40 bg-[linear-gradient(90deg,rgba(27,22,52,0.92),rgba(25,27,57,0.92))] px-7 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] lg:flex-row lg:items-center lg:justify-between">

            {/* Partie gauche */}
            <div className="flex items-center gap-5">
              <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-[#2c1b68] text-[#9d5cff]">
                <CompassIcon />
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-white">
                  EventSync, votre compagnon d’événements
                </h3>

                <p className="mt-1 max-w-[490px] text-[13px] leading-5 text-slate-300">
                  Suivez le programme, participez aux sessions en direct et créez votre
                  expérience unique à chaque événement.
                </p>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 lg:min-w-[650px]">
              <StatItem
                icon={<CalendarStatsIcon />}
                value="25+"
                label="Événements"
              />

              <StatItem
                icon={<UserStatsIcon />}
                value="120+"
                label="Intervenants"
              />

              <StatItem
                icon={<SessionIcon />}
                value="300+"
                label="Sessions"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-[50px] w-[40px] shrink-0 items-center justify-center rounded-2xl bg-[#211944] text-[#9d5cff]">
        {icon}
      </div>

      <div>
        <p className="text-[25px] font-extrabold leading-none text-[#9957ff]">
          {value}
        </p>
        <p className="mt-1 text-[13px] text-slate-300">{label}</p>
      </div>
    </div>
  );
}

function CompassIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarStatsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2V5M16 2V5M4 9H20M6 4H18C19.1046 4 20 4.89543 20 6V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V6C4 4.89543 4.89543 4 6 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserStatsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ParticipantsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21C12 21 18 17.5 18 11V5L12 3L6 5V11C6 17.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 11.5L11.2 13.2L14.8 9.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SessionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2V5M16 2V5M4 9H20M6 4H18C19.1046 4 20 4.89543 20 6V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V6C4 4.89543 4.89543 4 6 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 13H15M9 17H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeatureItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#47208f] to-[#25135a] text-[#c084fc] shadow-[0_10px_30px_rgba(93,45,196,0.28)]">
        {icon}
      </div>

      <div>
        <h3 className="text-[12px] font-semibold text-white">{title}</h3>
        <p className="mt-1 text-[11px] text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2V5M16 2V5M4 9H20M6 4H18C19.1046 4 20 4.89543 20 6V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V6C4 4.89543 4.89543 4 6 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="shrink-0 text-slate-300"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20L16.65 16.65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniCalendarIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2V5M16 2V5M4 9H20M6 4H18C19.1046 4 20 4.89543 20 6V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V6C4 4.89543 4.89543 4 6 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 13H10M14 13H16M8 17H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 11.5C20 15.0899 16.4183 18 12 18C10.8491 18 9.75486 17.8026 8.765 17.447L4 20L5.552 15.872C4.57532 14.6897 4 13.1903 4 11.5C4 7.91015 7.58172 5 12 5C16.4183 5 20 7.91015 20 11.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 11H9.01M12 11H12.01M15 11H15.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L14.78 8.63L21 9.54L16.5 13.93L17.56 20.13L12 17.21L6.44 20.13L7.5 13.93L3 9.54L9.22 8.63L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 10C20 15 12 21 12 21C12 21 4 15 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7V12L15 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UpcomingCalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2V5M16 2V5M4 9H20M6 4H18C19.1046 4 20 4.89543 20 6V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V6C4 4.89543 4.89543 4 6 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightTextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardPinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 10C20 15 12 21 12 21C12 21 4 15 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
        stroke="#A855F7"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" stroke="#A855F7" strokeWidth="2" />
    </svg>
  );
}

function CardCalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2V5M16 2V5M4 9H20M6 4H18C19.1046 4 20 4.89543 20 6V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V6C4 4.89543 4.89543 4 6 4Z"
        stroke="#A855F7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowLeftCarouselIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightCarouselIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

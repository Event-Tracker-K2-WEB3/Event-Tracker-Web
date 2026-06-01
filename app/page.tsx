"use client";

import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  eventService,
  type Event,
  type EventSession,
} from "./services/eventService";
import { getSessionById } from "./services/sessionService";
import { getSpeakers } from "./services/speakerService";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

type HomeStats = {
  totalEvents: number;
  totalSpeakers: number;
  totalSessions: number;
};

type HeroSession = {
  id: number;
  title: string;
  eventId: string;
  eventTitle: string;
  speakerName: string;
  roomName: string;
  startTime: string;
  endTime: string;
  live: boolean;
};

function safeDate(dateString?: string | null): Date | null {
  if (!dateString) return null;

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function formatDay(dateString: string): string {
  const date = safeDate(dateString);
  return date ? date.getDate().toString().padStart(2, "0") : "--";
}

function formatMonth(dateString: string): string {
  const date = safeDate(dateString);

  if (!date) return "---";

  return date
    .toLocaleDateString("en-US", { month: "short" })
    .replace(".", "")
    .toUpperCase();
}

function formatEventDate(startDate: string, endDate: string): string {
  const start = safeDate(startDate);
  const end = safeDate(endDate);

  if (!start || !end) {
    return "Date to be confirmed";
  }

  const startLabel = start.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  const endLabel = end.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${startLabel} - ${endLabel}`;
}

function formatSessionHour(dateString?: string | null): string {
  const date = safeDate(dateString);

  if (!date) {
    return "--:--";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isEventLive(startDate: string, endDate: string): boolean {
  const start = safeDate(startDate);
  const end = safeDate(endDate);

  if (!start || !end) {
    return false;
  }

  const now = new Date();
  return start <= now && end >= now;
}

function isSessionLive(startTime: string, endTime: string): boolean {
  const start = safeDate(startTime);
  const end = safeDate(endTime);

  if (!start || !end) {
    return false;
  }

  const now = new Date();
  return start <= now && end >= now;
}

export default function Page() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [pageReady, setPageReady] = useState(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [heroSessions, setHeroSessions] = useState<HeroSession[]>([]);
  const [activeHeroSessionIndex, setActiveHeroSessionIndex] = useState(0);

  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const [stats, setStats] = useState<HomeStats>({
    totalEvents: 0,
    totalSpeakers: 0,
    totalSessions: 0,
  });

  const upcomingEvents = useMemo(() => {
    return [...events].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }, [events]);

  const statsItems = useMemo(
    () => [
      {
        id: "events",
        icon: <CalendarStatsIcon />,
        value: `${stats.totalEvents}`,
        label: activeSearch ? "Results" : "Events",
      },
      {
        id: "speakers",
        icon: <UserStatsIcon />,
        value: `${stats.totalSpeakers}`,
        label: "Speakers",
      },
      {
        id: "sessions",
        icon: <SessionIcon />,
        value: `${stats.totalSessions}`,
        label: "Sessions",
      },
    ],
    [stats, activeSearch]
  );

  const activeHeroSession = heroSessions[activeHeroSessionIndex] ?? null;

  const scrollCarousel = (direction: "left" | "right") => {
    carouselRef.current?.scrollBy({
      left: direction === "right" ? 390 : -390,
      behavior: "smooth",
    });
  };

  const resetCarouselPosition = () => {
    carouselRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  const loadHeroSessions = useCallback(async (loadedEvents: Event[]) => {
    try {
      const sessionsByEvent = await Promise.all(
        loadedEvents.map(async (event) => {
          try {
            const eventSessions: EventSession[] =
              await eventService.getSessionsByEventId(event.id);

            const sessionsWithDetails = await Promise.all(
              eventSessions.map(async (session) => {
                try {
                  const details = await getSessionById(String(session.id));

                  return {
                    id: session.id,
                    title: session.title,
                    eventId: event.id,
                    eventTitle: event.title,
                    speakerName:
                      details.speakers?.[0]?.name ?? "Speaker to be confirmed",
                    roomName:
                      session.roomName ??
                      details.roomName ??
                      "Room to be confirmed",
                    startTime: session.startTime,
                    endTime: session.endTime,
                    live:
                      details.live ??
                      isSessionLive(session.startTime, session.endTime),
                  };
                } catch {
                  return {
                    id: session.id,
                    title: session.title,
                    eventId: event.id,
                    eventTitle: event.title,
                    speakerName: "Speaker to be confirmed",
                    roomName: session.roomName ?? "Room to be confirmed",
                    startTime: session.startTime,
                    endTime: session.endTime,
                    live: isSessionLive(session.startTime, session.endTime),
                  };
                }
              })
            );

            return sessionsWithDetails;
          } catch {
            return [];
          }
        })
      );

      const flattenedSessions = sessionsByEvent
        .flat()
        .sort(
          (a, b) =>
            new Date(a.startTime).getTime() -
            new Date(b.startTime).getTime()
        );

      setHeroSessions(flattenedSessions);
      setActiveHeroSessionIndex(0);
    } catch (error) {
      console.error("Error loading hero sessions:", error);
      setHeroSessions([]);
      setActiveHeroSessionIndex(0);
    }
  }, []);

  const loadEvents = useCallback(
    async (query: string = "") => {
      try {
        setIsLoadingEvents(true);
        setEventsError(null);

        const data = query
          ? await eventService.searchEvents(query, 1, 8)
          : await eventService.getAllEvents(1, 8);

        setEvents(data.content);

        await loadHeroSessions(data.content);

        setStats((previousStats) => ({
          ...previousStats,
          totalEvents: data.totalElements,
        }));
      } catch (error) {
        console.error("Error loading events:", error);

        setEvents([]);
        setHeroSessions([]);
        setEventsError("Unable to load events.");

        setStats((previousStats) => ({
          ...previousStats,
          totalEvents: 0,
        }));
      } finally {
        setIsLoadingEvents(false);
      }
    },
    [loadHeroSessions]
  );

  const loadSpeakers = useCallback(async () => {
    try {
      const speakers = await getSpeakers();

      setStats((previousStats) => ({
        ...previousStats,
        totalSpeakers: speakers.length,
      }));
    } catch (error) {
      console.error("Error loading speakers:", error);

      setStats((previousStats) => ({
        ...previousStats,
        totalSpeakers: 0,
      }));
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/about/stats`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Error loading stats: ${response.status}`);
      }

      const data = await response.json();

      setStats((previousStats) => ({
        ...previousStats,
        totalSessions: data.totalSessions ?? 0,
      }));
    } catch (error) {
      console.error("Error loading stats:", error);

      setStats((previousStats) => ({
        ...previousStats,
        totalSessions: 0,
      }));
    }
  }, []);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setPageReady(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    loadEvents();
    loadSpeakers();
    loadStats();
  }, [loadEvents, loadSpeakers, loadStats]);

  useEffect(() => {
    if (heroSessions.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveHeroSessionIndex((currentIndex) => {
        return (currentIndex + 1) % heroSessions.length;
      });
    }, 7000);

    return () => window.clearInterval(interval);
  }, [heroSessions.length]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const carousel = carouselRef.current;

      if (!carousel) {
        return;
      }

      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      if (maxScrollLeft <= 0) {
        return;
      }

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

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedSearch = searchTerm.trim();

    setActiveSearch(normalizedSearch);
    await loadEvents(normalizedSearch);
    resetCarouselPosition();
  };

  const handleResetSearch = async () => {
    setSearchTerm("");
    setActiveSearch("");

    await loadEvents();
    resetCarouselPosition();
  };

  return (
    <main
      className={`home-page min-h-[calc(100vh-76px)] ${
        pageReady ? "home-page-ready" : ""
      }`}
    >
      <style>
        {`
          @keyframes homeCardPop {
            from {
              opacity: 0;
              transform: translateY(24px) scale(0.96);
              filter: blur(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes floatingCard {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes softGlow {
            0%, 100% {
              box-shadow: 0 0 28px rgba(124, 58, 237, 0.16);
            }
            50% {
              box-shadow: 0 0 55px rgba(168, 85, 247, 0.28);
            }
          }

          @keyframes sessionCardChange {
            from {
              opacity: 0;
              transform: translateY(14px) scale(0.97);
              filter: blur(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          .home-reveal {
            opacity: 0;
            transform: translateY(28px);
            filter: blur(8px);
            transition:
              opacity 800ms ease,
              transform 800ms ease,
              filter 800ms ease;
          }

          .home-page-ready .home-reveal {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }

          .home-image-reveal {
            opacity: 0;
            transform: scale(1.05);
            filter: blur(10px);
            transition:
              opacity 1000ms ease,
              transform 1200ms ease,
              filter 1000ms ease;
          }

          .home-page-ready .home-image-reveal {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }

          .home-delay-100 {
            transition-delay: 100ms;
          }

          .home-delay-200 {
            transition-delay: 200ms;
          }

          .home-delay-300 {
            transition-delay: 300ms;
          }

          .home-delay-400 {
            transition-delay: 400ms;
          }

          .home-delay-500 {
            transition-delay: 500ms;
          }

          .home-delay-600 {
            transition-delay: 600ms;
          }

          .home-delay-700 {
            transition-delay: 700ms;
          }

          .home-card-pop {
            animation: homeCardPop 650ms ease-out both;
          }

          .home-floating-card {
            animation: floatingCard 5s ease-in-out infinite;
          }

          .home-glow-card {
            animation: softGlow 4s ease-in-out infinite;
          }

          .session-card-change {
            animation: sessionCardChange 650ms ease-out both;
          }
        `}
      </style>

      {/* HERO */}
      <section className="relative h-full min-h-[470px] overflow-hidden border-b border-white/5 bg-[#050817]">
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(circle_at_45%_30%,rgba(76,54,194,0.22),transparent_52%)]" />

        <div className="relative mx-auto grid h-full w-full grid-cols-1 pl-0 lg:grid-cols-[46%_54%] lg:pl-12">
          <div className="z-10 flex flex-col justify-center px-12 py-8">
            <div className="home-reveal home-delay-100 mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-200">
              <CalendarIcon />
              Event platform
            </div>

            <h1 className="home-reveal home-delay-200 max-w-[520px] text-[42px] font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-[56px] lg:text-[58px]">
              Experience every <br />
              event <br />
              <span className="bg-gradient-to-r from-[#b86cff] to-[#8b5cf6] bg-clip-text text-transparent">
                in real time.
              </span>
            </h1>

            <p className="home-reveal home-delay-300 mt-5 max-w-[520px] text-[15px] leading-7 text-slate-300">
              Discover inspiring conferences, hands-on workshops, and interact
              live with speakers and the community.
            </p>

            <form
              onSubmit={handleSearch}
              className="home-reveal home-delay-400 mt-7 flex h-[58px] w-full max-w-[575px] items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-300 focus-within:border-[#a855f7]/60 focus-within:bg-white/[0.06]"
            >
              <SearchIcon />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for an event, a place, a topic..."
                className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={isLoadingEvents}
                className="h-[42px] shrink-0 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6d4dff] px-5 text-[14px] font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.36)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                Search
              </button>
            </form>

            <div className="mt-7 grid max-w-[650px] grid-cols-1 gap-5 sm:grid-cols-3">
              <FeatureItem
                animationClass="home-delay-500"
                icon={<MiniCalendarIcon />}
                title="Real-time program"
                text="Never miss a session"
              />

              <FeatureItem
                animationClass="home-delay-600"
                icon={<ChatIcon />}
                title="Live interaction"
                text="Ask your questions live"
              />

              <FeatureItem
                animationClass="home-delay-700"
                icon={<StarIcon />}
                title="Your itinerary"
                text="Add your favorite sessions"
              />
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div
              className="home-image-reveal absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/home-ger.png')",
              }}
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,#050817_0%,rgba(5,8,23,0.92)_8%,rgba(5,8,23,0.55)_18%,rgba(5,8,23,0.12)_32%,transparent_45%)]" />

            <div className="home-reveal home-delay-600 home-floating-card absolute bottom-[28px] right-[26px] mr-12 w-[355px] rounded-[22px] border border-white/20 bg-[#0b0c1f]/55 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.52)] backdrop-blur-[18px]">
              {activeHeroSession ? (
                <div
                  key={`${activeHeroSession.id}-${activeHeroSessionIndex}`}
                  className="session-card-change"
                >
                  <div className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.06em] text-slate-200">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        activeHeroSession.live
                          ? "bg-[#ff4d6d]"
                          : "bg-[#a855f7]"
                      }`}
                    />
                    {activeHeroSession.live ? "Happening now" : "Coming soon"}
                  </div>

                  <h2 className="text-[20px] font-bold leading-tight text-white">
                    {activeHeroSession.title}
                  </h2>

                  <p className="mt-2 line-clamp-1 text-[12px] font-medium text-violet-300">
                    {activeHeroSession.eventTitle}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-slate-300">
                    <span className="flex items-center gap-2">
                      <UserIcon />
                      {activeHeroSession.speakerName}
                    </span>

                    <span className="flex items-center gap-2">
                      <PinIcon />
                      {activeHeroSession.roomName}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[13px] text-slate-300">
                    <ClockIcon />
                    {formatSessionHour(activeHeroSession.startTime)} -{" "}
                    {formatSessionHour(activeHeroSession.endTime)}
                  </div>

                  <a
                    href={`/sessions/${activeHeroSession.id}`}
                    className="mt-6 flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-[#b65cff]/70 bg-white/[0.01] text-[14px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06]"
                  >
                    <ArrowIcon />
                    {activeHeroSession.live ? "View live session" : "View session"}
                  </a>
                </div>
              ) : (
                <div className="session-card-change">
                  <div className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.06em] text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-[#a855f7]" />
                    Sessions
                  </div>

                  <h2 className="text-[20px] font-bold leading-tight text-white">
                    No session available
                  </h2>

                  <p className="mt-4 text-[13px] leading-6 text-slate-300">
                    Sessions will appear here once they are available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#09101f] py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(76,54,194,0.14),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(88,28,255,0.12),transparent_34%)]" />

        <div className="relative mx-auto w-full px-6 lg:px-[88px]">
          <div className="home-reveal home-delay-200 mb-5 flex flex-col justify-between gap-4 px-2 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-300">
                <UpcomingCalendarIcon />
                {activeSearch ? "Search results" : "Upcoming events"}
              </div>

              <h2 className="text-[25px] font-bold tracking-[-0.03em] text-white">
                {activeSearch
                  ? `Results for “${activeSearch}”`
                  : "Explore upcoming events"}
              </h2>
            </div>

            {activeSearch && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="w-fit rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-[#a855f7]/50 hover:bg-white/[0.08]"
              >
                Reset search
              </button>
            )}
          </div>

          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {isLoadingEvents && (
                <div className="home-card-pop flex h-[260px] w-full min-w-[340px] items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.03] px-6 text-center text-sm text-slate-300">
                  Loading events...
                </div>
              )}

              {eventsError && (
                <div className="home-card-pop flex h-[260px] w-full min-w-[340px] items-center justify-center rounded-[18px] border border-red-400/30 bg-red-500/10 px-6 text-center text-sm text-red-200">
                  {eventsError}
                </div>
              )}

              {!isLoadingEvents &&
                !eventsError &&
                upcomingEvents.length === 0 && (
                  <div className="home-card-pop flex h-[260px] w-full min-w-[340px] items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.03] px-6 text-center text-sm text-slate-300">
                    {activeSearch
                      ? `No event found for “${activeSearch}”.`
                      : "No events available."}
                  </div>
                )}

              {!isLoadingEvents &&
                !eventsError &&
                upcomingEvents.map((event, index) => (
                  <article
                    key={event.id}
                    style={{ animationDelay: `${index * 90}ms` }}
                    className="home-card-pop group w-[340px] shrink-0 overflow-hidden rounded-[18px] border border-white/15 bg-[#111827]/85 shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[#a855f7]/45 hover:shadow-[0_24px_70px_rgba(124,58,237,0.18)]"
                  >
                    <a href={`/events/${event.id}`}>
                      <div
                        className="relative h-[122px] overflow-hidden"
                        style={{
                          backgroundImage: "url('/home-ger.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.24))]" />

                        <div className="absolute left-4 top-4 flex h-[58px] w-[56px] flex-col items-center justify-center rounded-[10px] border border-[#b15cff] bg-[#11152d]/80 shadow-[0_10px_25px_rgba(0,0,0,0.38)] backdrop-blur-md">
                          <span className="text-[22px] font-bold leading-none text-white">
                            {formatDay(event.startDate)}
                          </span>

                          <span className="mt-1 text-[10px] font-semibold text-white">
                            {formatMonth(event.startDate)}
                          </span>
                        </div>

                        {isEventLive(event.startDate, event.endDate) && (
                          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#ff4d6d] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            Live
                          </div>
                        )}
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
                            {formatEventDate(event.startDate, event.endDate)}
                          </span>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
            </div>

            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              aria-label="View previous events"
              className="absolute -left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151c2c]/95 text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition duration-300 hover:scale-105 hover:border-[#a855f7]/50 hover:bg-[#20283b] xl:flex"
            >
              <ArrowLeftCarouselIcon />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              aria-label="View next events"
              className="absolute -right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151c2c]/95 text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition duration-300 hover:scale-105 hover:border-[#a855f7]/50 hover:bg-[#20283b] xl:flex"
            >
              <ArrowRightCarouselIcon />
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#08101f] py-12">
        <div className="relative mx-auto w-full px-6 lg:px-[88px]">
          <div className="home-reveal home-delay-300 home-glow-card flex flex-col gap-8 rounded-[22px] border border-[#9b59ff]/40 bg-[linear-gradient(90deg,rgba(27,22,52,0.92),rgba(25,27,57,0.92))] px-7 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-[#2c1b68] text-[#9d5cff]">
                <CompassIcon />
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-white">
                  EventSync, your event companion
                </h3>

                <p className="mt-1 max-w-[490px] text-[13px] leading-5 text-slate-300">
                  Follow the program, join live sessions, and create your own
                  unique experience at every event.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:min-w-[520px]">
              {statsItems.map((item, index) => (
                <StatItem
                  key={item.id}
                  animationDelay={`${index * 120}ms`}
                  icon={item.icon}
                  value={item.value}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-reveal home-delay-400 border-t border-white/5 bg-[#06060f]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <a
                href="/"
                className="mb-4 flex items-center gap-2 text-xl font-bold"
              >
                <span className="grid size-10 place-items-center">
                  <img src="/logo-event-tracker.png" alt="" />
                </span>

                <span>
                  <span className="text-white">Event</span>
                  <span className="text-violet-400">Sync</span>
                </span>
              </a>

              <p className="max-w-xs text-sm leading-relaxed text-white/40">
                The platform that connects events and participants in real time.
              </p>
            </div>

            {[
              { title: "Navigation", links: ["Home", "Events", "Speakers", "About"] },
              { title: "Resources", links: ["Program", "FAQ", "Contact"] },
              { title: "Legal", links: ["Legal notice", "Privacy", "Terms of use"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="mb-4 text-xs uppercase tracking-widest text-white/60">
                  {title}
                </h4>

                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/40 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6">
            <p className="text-sm text-white/25">
              © 2026 EventSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StatItem({
  icon,
  value,
  label,
  animationDelay,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  animationDelay: string;
}) {
  return (
    <div
      style={{ animationDelay }}
      className="home-card-pop flex items-center gap-3"
    >
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

function FeatureItem({
  icon,
  title,
  text,
  animationClass,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  animationClass: string;
}) {
  return (
    <div className={`home-reveal ${animationClass} flex items-center gap-3`}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#47208f] to-[#25135a] text-[#c084fc] shadow-[0_10px_30px_rgba(93,45,196,0.28)] transition duration-300 hover:scale-105">
        {icon}
      </div>

      <div>
        <h3 className="text-[12px] font-semibold text-white">{title}</h3>
        <p className="mt-1 text-[11px] text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function CompassIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
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
  return <CalendarIcon />;
}

function UserStatsIcon() {
  return <UserIcon />;
}

function SessionIcon() {
  return <MiniCalendarIcon />;
}

function CalendarIcon() {
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

function SearchIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" />
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
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UpcomingCalendarIcon() {
  return <CalendarIcon />;
}

function CardPinIcon() {
  return <PinIcon />;
}

function CardCalendarIcon() {
  return <CalendarIcon />;
}

function ArrowLeftCarouselIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
      <path d="M11 6L5 12L11 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowRightCarouselIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
"use client";

import {
  type FormEvent,
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

import HomeAnimations from "./components/home/HomeAnimations";
import HomeEventsSection from "./components/home/HomeEventsSection";
import HomeFooter from "./components/home/HomeFooter";
import HomeHeroSection from "./components/home/HomeHeroSection";
import HomeStatsSection from "./components/home/HomeStatsSection";
import type { HeroSession, HomeStats } from "./components/home/homeTypes";
import { isSessionLive } from "./components/home/homeDateUtils";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

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
      <HomeAnimations />

      <HomeHeroSection
        activeHeroSession={activeHeroSession}
        activeHeroSessionIndex={activeHeroSessionIndex}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoadingEvents={isLoadingEvents}
        onSearch={handleSearch}
      />

      <HomeEventsSection
        carouselRef={carouselRef}
        upcomingEvents={upcomingEvents}
        isLoadingEvents={isLoadingEvents}
        eventsError={eventsError}
        activeSearch={activeSearch}
        onResetSearch={handleResetSearch}
        onScrollCarousel={scrollCarousel}
      />

      <HomeStatsSection stats={stats} activeSearch={activeSearch} />

      <HomeFooter />
    </main>
  );
}

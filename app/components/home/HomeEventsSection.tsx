"use client";

import type { RefObject } from "react";

import type { Event } from "@/app/services/eventService";
import {
  formatDay,
  formatEventDate,
  formatMonth,
  isEventLive,
} from "./homeDateUtils";
import {
  ArrowLeftCarouselIcon,
  ArrowRightCarouselIcon,
  CardCalendarIcon,
  CardPinIcon,
  UpcomingCalendarIcon,
} from "./HomeIcons";

type HomeEventsSectionProps = {
  carouselRef: RefObject<HTMLDivElement | null>;
  upcomingEvents: Event[];
  isLoadingEvents: boolean;
  eventsError: string | null;
  activeSearch: string;
  onResetSearch: () => void | Promise<void>;
  onScrollCarousel: (direction: "left" | "right") => void;
};

export default function HomeEventsSection({
  carouselRef,
  upcomingEvents,
  isLoadingEvents,
  eventsError,
  activeSearch,
  onResetSearch,
  onScrollCarousel,
}: HomeEventsSectionProps) {
  return (
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
              onClick={onResetSearch}
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

            {!isLoadingEvents && !eventsError && upcomingEvents.length === 0 && (
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
                      className="relative h-24 overflow-hidden bg-gradient-to-br from-event-primary/30 via-event-primary/10 to-event-secondary/20"
                      style={{
                        backgroundImage: event.imageUrl
                          ? `url(${event.imageUrl})`
                          : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20" />
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
            onClick={() => onScrollCarousel("left")}
            aria-label="View previous events"
            className="absolute -left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151c2c]/95 text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition duration-300 hover:scale-105 hover:border-[#a855f7]/50 hover:bg-[#20283b] xl:flex"
          >
            <ArrowLeftCarouselIcon />
          </button>

          <button
            type="button"
            onClick={() => onScrollCarousel("right")}
            aria-label="View next events"
            className="absolute -right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151c2c]/95 text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition duration-300 hover:scale-105 hover:border-[#a855f7]/50 hover:bg-[#20283b] xl:flex"
          >
            <ArrowRightCarouselIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";

import type { HeroSession } from "./homeTypes";
import { formatSessionHour } from "./homeDateUtils";
import FeatureItem from "./FeatureItem";
import {
  ArrowIcon,
  CalendarIcon,
  ChatIcon,
  ClockIcon,
  MiniCalendarIcon,
  PinIcon,
  SearchIcon,
  StarIcon,
  UserIcon,
} from "./HomeIcons";

type HomeHeroSectionProps = {
  activeHeroSession: HeroSession | null;
  activeHeroSessionIndex: number;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isLoadingEvents: boolean;
  onSearch: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
};

export default function HomeHeroSection({
  activeHeroSession,
  activeHeroSessionIndex,
  searchTerm,
  setSearchTerm,
  isLoadingEvents,
  onSearch,
}: HomeHeroSectionProps) {
  return (
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
            onSubmit={onSearch}
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
  );
}

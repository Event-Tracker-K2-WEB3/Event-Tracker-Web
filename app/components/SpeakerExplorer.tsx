"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Speaker } from "@/app/services/speakerService";
import SpeakerCard from "./SpeakerCard";

const DOMAINS = ["All", "AI", "Data", "Web", "Cloud", "Cybersecurity", "Mobile"];
const SESSION_TYPES = ["All", "Conference", "Workshop", "Panel", "Q&A"];
const SORT_OPTIONS = ["Alphabetical", "Most popular", "Most recent"];

interface SpeakerExplorerProps {
  speakers: Speaker[];
}

export default function SpeakerExplorer({ speakers }: SpeakerExplorerProps) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [sessionType, setSessionType] = useState("All");
  const [sortBy, setSortBy] = useState("Alphabetical");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredSpeakers = useMemo(() => {
    let result = [...speakers];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((speaker) => {
        return (
            speaker.name.toLowerCase().includes(query) ||
            speaker.specialty.toLowerCase().includes(query) ||
            speaker.company.toLowerCase().includes(query) ||
            speaker.role.toLowerCase().includes(query)
        );
      });
    }

    if (domain !== "All") {
      result = result.filter((speaker) => {
        if (domain === "Cybersecurity") {
          return speaker.specialty === "Cybersecurity" || speaker.specialty === "Cybersécurité";
        }

        return speaker.specialty === domain;
      });
    }

    if (sessionType !== "All") {
      const storedSessionType = sessionType === "Conference" ? "Conférence" : sessionType === "Workshop" ? "Atelier" : sessionType;
      result = result.filter(
          (speaker) => speaker.sessionType === sessionType || speaker.sessionType === storedSessionType
      );
    }

    if (sortBy === "Alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Most popular") {
      result.sort((a, b) => b.sessionCount - a.sessionCount);
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [speakers, search, domain, sessionType, sortBy]);

  const visibleSpeakers = filteredSpeakers.slice(0, visibleCount);

  return (
      <div className="min-h-screen overflow-x-hidden bg-[#080812] text-white">
        <section className="relative overflow-hidden px-6 py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)]" />

          <div
              className={`relative mx-auto max-w-7xl transform text-center transition-all duration-1000 ease-out ${
                  isMounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
          <span className="mb-4 inline-block animate-pulse text-sm font-medium uppercase tracking-widest text-violet-400">
            Our speakers
          </span>

            <h1 className="mb-6 bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
              Experts &amp; Speakers
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50">
              Meet the leaders and innovators shaping the future of digital technology.
            </p>

            <p className="mt-4 text-sm font-medium text-violet-400">
              {speakers.length} speaker{speakers.length > 1 ? "s" : ""} confirmed
            </p>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div
              className={`mx-auto flex max-w-7xl transform flex-col items-end justify-between gap-5 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-[#0d0d17]/80 via-[#120e25]/70 to-[#0d0d17]/80 p-5 shadow-[0_8px_32px_0_rgba(109,40,217,0.1)] backdrop-blur-xl transition-all delay-150 duration-1000 ease-out hover:border-violet-500/30 xl:flex-row ${
                  isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            <div className="flex w-full flex-col gap-1.5 xl:w-[42%]">
            <span className="pl-1 text-xs font-medium uppercase tracking-wider text-white/40">
              Search
            </span>

              <div className="group relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-violet-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                    type="text"
                    placeholder="Search for a speaker by name, specialty, company..."
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setVisibleCount(6);
                    }}
                    className="w-full rounded-xl border border-violet-500/10 bg-[#16122c]/40 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 transition-all duration-300 focus:border-violet-500/60 focus:bg-[#16122c]/60 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-4 xl:w-[55%]">
              <FilterSelect
                  label="Filter"
                  value={domain}
                  options={DOMAINS}
                  onChange={(value) => {
                    setDomain(value);
                    setVisibleCount(6);
                  }}
              />



              <FilterSelect
                  label="Type"
                  value={sessionType}
                  options={SESSION_TYPES}
                  onChange={(value) => {
                    setSessionType(value);
                    setVisibleCount(6);
                  }}
              />

              <FilterSelect
                  label="Sort by"
                  value={sortBy}
                  options={SORT_OPTIONS}
                  onChange={(value) => {
                    setSortBy(value);
                    setVisibleCount(6);
                  }}
              />
            </div>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            {visibleSpeakers.length === 0 ? (
                <div className="py-24 text-center text-white/30">
                  <p className="text-lg">
                    No speaker matches your search.
                  </p>
                </div>
            ) : (
                <>
                  <p
                      className={`mb-6 text-sm text-white/30 transition-all delay-300 duration-700 ${
                          isMounted ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    {filteredSpeakers.length} speaker{filteredSpeakers.length > 1 ? "s" : ""} found
                  </p>

                  <div
                      className={`grid grid-cols-1 gap-6 transition-all delay-300 duration-1000 sm:grid-cols-2 lg:grid-cols-3 ${
                          isMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                      }`}
                  >
                    {visibleSpeakers.map((speaker, index) => (
                        <div
                            key={speaker.id}
                            style={{ transitionDelay: `${(index % 6) * 75}ms` }}
                            className={`transform transition-all duration-700 ease-out ${
                                isMounted
                                    ? "translate-y-0 scale-100 opacity-100"
                                    : "translate-y-4 scale-95 opacity-0"
                            }`}
                        >
                          <SpeakerCard
                              speaker={speaker}
                              index={index}
                          />
                        </div>
                    ))}
                  </div>

                  {visibleCount < filteredSpeakers.length && (
                      <div className="mt-12 text-center">
                        <button
                            onClick={() => setVisibleCount((current) => current + 6)}
                            className="rounded-xl border border-violet-500/40 px-8 py-3 text-sm font-medium text-violet-400 transition-all duration-200 hover:scale-[1.02] hover:border-violet-400 hover:bg-violet-500/10 active:scale-[0.98]"
                        >
                          Load more ({filteredSpeakers.length - visibleCount} remaining)
                        </button>
                      </div>
                  )}
                </>
            )}
          </div>
        </section>

        <footer className="border-t border-white/5 bg-[#06060f]">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                        <span className="grid size-10 place-items-center">
                            <img src="/logo-event-tracker.png" alt="" />
                        </span>
                  <span><span className="text-white">Event</span><span className="text-violet-400">Sync</span></span>
                </Link>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                  The platform that connects events and participants in real time.
                </p>
              </div>

              {[
                { title: "Navigation", links: ["Home", "Events", "Speakers", "About"] },
                { title: "Resources", links: ["Program", "FAQ", "Contact"] },
                { title: "Legal", links: ["Legal notice", "Privacy", "Terms of use"] },
              ].map(({ title, links }) => (
                  <div key={title}>
                    <h4 className="text-white/60 text-xs uppercase tracking-widest mb-4">{title}</h4>
                    <ul className="space-y-2.5">
                      {links.map((l) => (
                          <li key={l}>
                            <Link href="#" className="text-white/40 text-sm hover:text-white transition-colors">{l}</Link>
                          </li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
              <p className="text-white/25 text-sm">© 2026 EventSync. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}

function FilterSelect({
                        label,
                        value,
                        options,
                        onChange,
                      }: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
      <div className="flex flex-col gap-1.5">
      <span className="pl-1 text-xs font-medium uppercase tracking-wider text-white/40">
        {label}
      </span>

        <div className="relative">
          <select
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-violet-500/10 bg-[#16122c]/40 px-4 py-3 text-sm text-white/80 transition-all duration-300 hover:border-violet-500/30 focus:border-violet-500/60 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)] focus:outline-none"
          >
            {options.map((option) => (
                <option key={option} value={option} className="bg-[#0f0f1a] text-white">
                  {option}
                </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/30">
          ▼
        </span>
        </div>
      </div>
  );
}
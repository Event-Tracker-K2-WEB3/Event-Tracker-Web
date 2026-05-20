"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  UserRound,
  UsersRound,
  Armchair,
  Building2,
} from "lucide-react";

import type { Event } from "@/app/services/eventService";
import type { Room, RoomSession } from "@/app/services/roomService";

interface RoomPlanningExplorerProps {
  event: Event;
  rooms: Room[];
  activeRoom: Room;
  sessions: RoomSession[];
}

type DayOption = {
  key: string;
  label: string;
};

function dateKey(dateValue: string | Date): string {
  const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDayLabel(date: Date): string {
  const day = date.toLocaleDateString("fr-FR", {
    day: "numeric",
  });

  const month = date.toLocaleDateString("fr-FR", {
    month: "long",
  });

  const capitalizedMonth =
    month.charAt(0).toUpperCase() + month.slice(1);

  return `${day} ${capitalizedMonth}`;
}

function getEventDays(startDate: string, endDate: string): DayOption[] {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const days: DayOption[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    days.push({
      key: dateKey(cursor),
      label: formatDayLabel(cursor),
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function getDefaultActiveDay(days: DayOption[]): string {
  const today = dateKey(new Date());
  const currentDay = days.find((day) => day.key === today);

  return currentDay?.key ?? days[0]?.key ?? "";
}

function formatHour(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isSessionLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  return now >= start && now <= end;
}

export default function RoomPlanningExplorer({
  event,
  rooms,
  activeRoom,
  sessions,
}: RoomPlanningExplorerProps) {
  const router = useRouter();

  const days = useMemo(
    () => getEventDays(event.startDate, event.endDate),
    [event.startDate, event.endDate]
  );

  const [activeDay, setActiveDay] = useState<string>(() =>
    getDefaultActiveDay(days)
  );

  const visibleSessions = useMemo(() => {
    return sessions
      .filter((session) => dateKey(session.startTime) === activeDay)
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() -
          new Date(b.startTime).getTime()
      );
  }, [sessions, activeDay]);

  const maxCapacity = useMemo(() => {
    const capacities = visibleSessions
      .map((session) => session.capacity)
      .filter((capacity): capacity is number => capacity !== null);

    if (capacities.length === 0) {
      return null;
    }

    return Math.max(...capacities);
  }, [visibleSessions]);

  const handleRoomChange = (roomId: string) => {
    router.push(`/events/${event.id}/rooms/${roomId}`);
  };

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#06101f] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#050817]">
        <div
          className="absolute inset-y-0 right-0 hidden w-[58%] bg-cover bg-center lg:block"
          style={{
            backgroundImage:
              "url('/tech-summit-conference-crowd-stage-purple-hero.png')",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050817_0%,#050817_40%,rgba(5,8,23,0.76)_58%,rgba(5,8,23,0.18)_78%,rgba(5,8,23,0.05)_100%)]" />

        <div className="event-container relative flex min-h-[218px] items-center py-8">
          <div className="max-w-[620px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.03em] text-slate-200">
              <CalendarDays size={15} />
              Planning par salle
            </div>

            <h1 className="text-[42px] font-extrabold leading-none tracking-[-0.04em] text-white md:text-[52px]">
              {activeRoom.name}
            </h1>

            <p className="mt-4 max-w-[540px] text-[16px] leading-7 text-slate-300">
              Découvrez toutes les sessions prévues dans cette salle pour le{" "}
              {event.title}.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="event-container py-5">
        {/* FILTRES */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {/* Filtres de date */}
          <div className="inline-flex w-fit overflow-hidden rounded-xl border border-white/15 bg-white/[0.03]">
            {days.map((day) => {
              const isActive = day.key === activeDay;

              return (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => setActiveDay(day.key)}
                  className={[
                    "min-w-[128px] px-6 py-3 text-[15px] font-semibold transition",
                    isActive
                      ? "bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white shadow-[0_12px_28px_rgba(124,58,237,0.28)]"
                      : "border-l border-white/10 text-slate-200 hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  {day.label}
                </button>
              );
            })}
          </div>

          {/* Select salle */}
          <div className="relative w-full lg:w-[315px]">
            <Building2
              size={18}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-200"
            />

            <select
              value={activeRoom.id}
              onChange={(event) => handleRoomChange(event.target.value)}
              className="h-[52px] w-full appearance-none rounded-xl border border-white/15 bg-white/[0.04] pl-14 pr-12 text-[15px] font-medium text-white outline-none transition hover:border-violet-400/50 focus:border-violet-400/70"
            >
              {rooms.map((room) => (
                <option
                  key={room.id}
                  value={room.id}
                  className="bg-[#0b1120] text-white"
                >
                  {room.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-200"
            />
          </div>
        </div>

        {/* GRILLE PRINCIPALE */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Sessions */}
          <div>
            {visibleSessions.length === 0 ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 text-center text-slate-300">
                Aucune session n’est prévue dans cette salle pour cette date.
              </div>
            ) : (
              <div className="space-y-2.5">
                {visibleSessions.map((session) => {
                  const live = isSessionLive(
                    session.startTime,
                    session.endTime
                  );

                  return (
                    <article
                      key={session.id}
                      className={[
                        "group flex flex-col gap-4 rounded-2xl border px-4 py-3.5 transition md:flex-row md:items-center md:justify-between",
                        live
                          ? "border-violet-500/70 bg-[linear-gradient(90deg,rgba(88,28,135,0.18),rgba(20,25,47,0.92))] shadow-[0_10px_35px_rgba(124,58,237,0.18)]"
                          : "border-white/15 bg-[#0d1526]/85 hover:border-violet-400/45",
                      ].join(" ")}
                    >
                      <div className="flex min-w-0 items-center gap-5">
                        {/* Heure */}
                        <div className="flex h-[62px] w-[102px] shrink-0 items-center justify-center rounded-xl border border-violet-500 bg-[#091120] text-[20px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
                          {formatHour(session.startTime)}
                        </div>

                        {/* Infos */}
                        <div className="min-w-0">
                          <h2 className="truncate text-[18px] font-bold tracking-[-0.02em] text-white">
                            {session.title}
                          </h2>

                          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-slate-400">
                            <span className="inline-flex items-center gap-2">
                              <UserRound size={16} />
                              {session.speaker?.name ??
                                "Intervenant à confirmer"}
                            </span>

                            <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:inline-block" />

                            <span>
                              {formatHour(session.startTime)} –{" "}
                              {formatHour(session.endTime)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Statut */}
                      <div className="flex shrink-0 items-center justify-end pr-2">
                        {live ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#ff334f] px-4 py-2 text-[13px] font-extrabold uppercase tracking-wide text-white shadow-[0_10px_24px_rgba(255,51,79,0.32)]">
                            <span className="h-2 w-2 rounded-full bg-white" />
                            Live
                          </span>
                        ) : (
                          <span
                            className="h-4 w-4 rounded-full bg-violet-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]"
                            aria-label="Session à venir"
                          />
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* LÉGENDE */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-6 text-[14px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[#ff334f]" />
                <span>LIVE = session en cours</span>
              </div>

              <span className="hidden h-6 w-px bg-white/15 sm:block" />

              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-violet-500" />
                <span>À venir</span>
              </div>
            </div>
          </div>

          {/* CARTE SALLE */}
          <aside className="h-fit rounded-2xl border border-violet-400/45 bg-[#0d1526]/88 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(145deg,#33206e,#18153b)] text-fuchsia-300">
                <Armchair size={28} />
              </div>

              <h2 className="text-[22px] font-bold text-white">
                {activeRoom.name}
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/35 bg-white/[0.03] text-fuchsia-300">
                  <UsersRound size={24} />
                </div>

                <p className="text-[15px] text-slate-200">
                  {visibleSessions.length} session
                  {visibleSessions.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/35 bg-white/[0.03] text-fuchsia-300">
                  <Armchair size={24} />
                </div>

                <p className="text-[15px] text-slate-200">
                  {maxCapacity !== null
                    ? `Capacité ${maxCapacity}`
                    : "Capacité non renseignée"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
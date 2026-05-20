"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Filter,
  UserRound,
  UsersRound,
} from "lucide-react";

import type { Event } from "@/app/services/eventService";
import type { Room } from "@/app/services/roomService";
import type { Session } from "@/app/services/sessionService";

interface GlobalPlanningExplorerProps {
  event: Event;
  rooms: Room[];
  sessions: Session[];
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

function formatPlanningDay(date: Date): string {
  const day = date.toLocaleDateString("fr-FR", {
    day: "numeric",
  });

  const month = date.toLocaleDateString("fr-FR", {
    month: "long",
  });

  return `${day} ${month.charAt(0).toUpperCase()}${month.slice(1)}`;
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
      label: formatPlanningDay(cursor),
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function getDefaultDay(days: DayOption[]): string {
  const today = dateKey(new Date());
  const todayInEvent = days.find((day) => day.key === today);

  return todayInEvent?.key ?? days[0]?.key ?? "";
}

function formatHour(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatEventDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const endDay = end.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${startDay} au ${endDay}`;
}

function isSessionLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  return now >= start && now <= end;
}

function buildTimelineHours(sessions: Session[]): string[] {
  if (sessions.length === 0) {
    return ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
  }

  const startHours = sessions.map((session) => new Date(session.startTime).getHours());
  const endHours = sessions.map((session) => new Date(session.endTime).getHours());

  const minHour = Math.min(...startHours);
  const maxHour = Math.max(...endHours);

  const hours: string[] = [];

  for (let hour = minHour; hour <= maxHour; hour++) {
    hours.push(`${String(hour).padStart(2, "0")}:00`);
  }

  return hours;
}

function getSessionsForRoomAndHour(
  sessions: Session[],
  roomId: number,
  hourLabel: string
): Session[] {
  const hour = Number(hourLabel.slice(0, 2));

  return sessions.filter((session) => {
    const sessionStart = new Date(session.startTime);
    return session.room?.id === roomId && sessionStart.getHours() === hour;
  });
}

export default function GlobalPlanningExplorer({
  event,
  rooms,
  sessions,
}: GlobalPlanningExplorerProps) {
  const days = useMemo(
    () => getEventDays(event.startDate, event.endDate),
    [event.startDate, event.endDate]
  );

  const [activeDay, setActiveDay] = useState(() => getDefaultDay(days));
  const [selectedRoom, setSelectedRoom] = useState("all");

  const sessionsOfSelectedDay = useMemo(() => {
    return sessions.filter((session) => dateKey(session.startTime) === activeDay);
  }, [sessions, activeDay]);

  const visibleRooms = useMemo(() => {
    if (selectedRoom === "all") {
      return rooms;
    }

    return rooms.filter((room) => room.id === Number(selectedRoom));
  }, [rooms, selectedRoom]);

  const filteredSessions = useMemo(() => {
    if (selectedRoom === "all") {
      return sessionsOfSelectedDay;
    }

    return sessionsOfSelectedDay.filter(
      (session) => session.room?.id === Number(selectedRoom)
    );
  }, [sessionsOfSelectedDay, selectedRoom]);

  const timelineHours = useMemo(
    () => buildTimelineHours(filteredSessions),
    [filteredSessions]
  );

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

        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050817_0%,#050817_42%,rgba(5,8,23,0.77)_58%,rgba(5,8,23,0.18)_82%,rgba(5,8,23,0.05)_100%)]" />

        <div className="event-container relative flex min-h-[270px] items-center py-8">
          <div className="max-w-[760px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.03em] text-slate-200">
              <CalendarDays size={15} />
              Planning global
            </div>

            <h1 className="text-[42px] font-extrabold leading-none tracking-[-0.04em] text-white md:text-[56px]">
              Planning global
            </h1>

            <p className="mt-4 max-w-[720px] text-[16px] leading-7 text-slate-300">
              Découvrez le programme global du {event.title}, du{" "}
              {formatEventDateRange(event.startDate, event.endDate)}.
            </p>
          </div>
        </div>
      </section>

      {/* FILTRES + TABLEAU */}
      <section className="event-container py-5">
        {/* FILTRES */}
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center">
          {/* Dates */}
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

          {/* Select room */}
          <div className="relative w-full xl:ml-10 xl:w-[260px]">
            <Filter
              size={17}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-200"
            />

            <select
              value={selectedRoom}
              onChange={(event) => setSelectedRoom(event.target.value)}
              className="h-[52px] w-full appearance-none rounded-xl border border-white/15 bg-white/[0.04] pl-14 pr-12 text-[15px] font-medium text-white outline-none transition hover:border-violet-400/50 focus:border-violet-400/70"
            >
              <option value="all" className="bg-[#0b1120] text-white">
                Toutes les salles
              </option>

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

        {/* TABLEAU PLANNING */}
        <div className="overflow-x-auto rounded-[22px] border border-white/20 bg-[#081120]/90 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div
            className="min-w-[1100px]"
            style={{
              gridTemplateColumns: `145px repeat(${visibleRooms.length}, minmax(300px, 1fr))`,
            }}
          >
            {/* Header */}
            <div
              className="grid border-b border-white/15"
              style={{
                gridTemplateColumns: `145px repeat(${visibleRooms.length}, minmax(300px, 1fr))`,
              }}
            >
              <div className="flex h-[58px] items-center justify-center border-r border-white/15 text-[14px] text-slate-300">
                Heure
              </div>

              {visibleRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex h-[58px] items-center justify-center gap-3 border-r border-white/10 text-[16px] font-semibold text-violet-400 last:border-r-0"
                >
                  <UsersRound size={20} />
                  {room.name}
                </div>
              ))}
            </div>

            {/* Rows */}
            {timelineHours.map((hour) => (
              <div
                key={hour}
                className="grid min-h-[92px] border-b border-white/10 last:border-b-0"
                style={{
                  gridTemplateColumns: `145px repeat(${visibleRooms.length}, minmax(300px, 1fr))`,
                }}
              >
                {/* Heure */}
                <div className="flex items-start justify-center border-r border-white/15 pt-5 text-[14px] text-slate-300">
                  {hour}
                </div>

                {/* Colonnes salles */}
                {visibleRooms.map((room) => {
                  const roomSessions = getSessionsForRoomAndHour(
                    filteredSessions,
                    room.id,
                    hour
                  );

                  return (
                    <div
                      key={`${hour}-${room.id}`}
                      className="min-h-[92px] border-r border-dashed border-white/10 px-4 py-3 last:border-r-0"
                    >
                      <div className="space-y-3">
                        {roomSessions.map((session) => {
                          const live = isSessionLive(
                            session.startTime,
                            session.endTime
                          );

                          return (
                            <article
                              key={session.id}
                              className={[
                                "rounded-xl border px-4 py-3 transition",
                                live
                                  ? "border-violet-500/55 bg-[linear-gradient(90deg,rgba(95,42,167,0.26),rgba(27,26,57,0.95))] shadow-[0_12px_35px_rgba(124,58,237,0.18)]"
                                  : "border-violet-400/30 bg-[#17152e]/95 hover:border-violet-400/60",
                              ].join(" ")}
                            >
                              <div className="flex flex-wrap items-center gap-2">
                                {live && (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff445c] px-2.5 py-1 text-[11px] font-extrabold uppercase text-white">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                    Live
                                  </span>
                                )}

                                <h3 className="text-[15px] font-bold leading-tight text-white">
                                  {session.title}
                                </h3>
                              </div>

                              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-slate-300">
                                <span>
                                  {formatHour(session.startTime)} -{" "}
                                  {formatHour(session.endTime)}
                                </span>

                                <span className="inline-flex items-center gap-2">
                                  <UserRound size={15} />
                                  {session.speaker?.name ??
                                    "Intervenant à confirmer"}
                                </span>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Footer légende */}
            <div className="flex items-center justify-center gap-8 border-t border-white/10 py-4 text-[14px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[#ff445c]" />
                <span className="font-semibold text-[#ff5c72]">LIVE</span>
                <span>Session en cours</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-violet-500" />
                <span>À venir</span>
              </div>
            </div>
          </div>
        </div>

        {filteredSessions.length === 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center text-slate-300">
            Aucune session disponible pour ce jour et cette salle.
          </div>
        )}
      </section>
    </main>
  );
}
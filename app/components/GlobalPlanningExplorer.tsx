"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  Filter,
  UserRound,
  UsersRound,
} from "lucide-react";

import type { Event, EventSession } from "@/app/services/eventService";
import type { Room } from "@/app/services/roomService";

export type PlanningSession = EventSession & {
  speakerName?: string | null;
  live?: boolean | null;
  room?: {
    id?: number | null;
    name?: string | null;
  } | null;
  speaker?: {
    name?: string | null;
  } | null;
};

interface GlobalPlanningExplorerProps {
  event: Event;
  rooms: Room[];
  sessions: PlanningSession[];
}

type DayOption = {
  key: string;
  label: string;
};

type PlanningRoom = {
  id: number;
  name: string;
};

function safeDate(value?: string | Date | null): Date | null {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function dateKey(dateValue?: string | Date | null): string {
  const date = safeDate(dateValue);

  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatPlanningDay(date: Date): string {
  const day = date.toLocaleDateString("en-US", {
    day: "numeric",
  });

  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  return `${day} ${month.charAt(0).toUpperCase()}${month.slice(1)}`;
}

function formatHour(dateString?: string | null): string {
  const date = safeDate(dateString);

  if (!date) {
    return "--:--";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatEventDateRange(startDate: string, endDate: string): string {
  const start = safeDate(startDate);
  const end = safeDate(endDate);

  if (!start || !end) {
    return "date to be confirmed";
  }

  const startDay = start.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  const endDay = end.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${startDay} to ${endDay}`;
}

function isSessionLive(startTime: string, endTime: string): boolean {
  const start = safeDate(startTime);
  const end = safeDate(endTime);

  if (!start || !end) {
    return false;
  }

  const now = new Date();

  return now >= start && now <= end;
}

function getRoomId(session: PlanningSession): number | null {
  return session.roomId ?? session.room?.id ?? null;
}

function getRoomName(session: PlanningSession): string {
  return (
    session.roomName ??
    session.room?.name ??
    "Room to be confirmed"
  );
}

function getSpeakerName(session: PlanningSession): string {
  return (
    session.speakerName ??
    session.speaker?.name ??
    "Speaker to be confirmed"
  );
}

function getPlanningDays(
  event: Event,
  sessions: PlanningSession[]
): DayOption[] {
  const sessionDays = new Map<string, DayOption>();

  sessions.forEach((session) => {
    const date = safeDate(session.startTime);

    if (!date) {
      return;
    }

    const key = dateKey(date);

    sessionDays.set(key, {
      key,
      label: formatPlanningDay(date),
    });
  });

  if (sessionDays.size > 0) {
    return Array.from(sessionDays.values()).sort((a, b) =>
      a.key.localeCompare(b.key)
    );
  }

  const start = safeDate(event.startDate);
  const end = safeDate(event.endDate);

  if (!start || !end) {
    return [];
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const days: DayOption[] = [];
  const cursor = new Date(start);

  while (cursor <= end && days.length < 14) {
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

function buildPlanningRooms(
  rooms: Room[],
  sessions: PlanningSession[]
): PlanningRoom[] {
  const roomMap = new Map<number, PlanningRoom>();

  rooms.forEach((room) => {
    roomMap.set(room.id, {
      id: room.id,
      name: room.name,
    });
  });

  sessions.forEach((session) => {
    const roomId = getRoomId(session);

    if (roomId === null) {
      return;
    }

    if (!roomMap.has(roomId)) {
      roomMap.set(roomId, {
        id: roomId,
        name: getRoomName(session),
      });
    }
  });

  return Array.from(roomMap.values()).sort((a, b) => a.id - b.id);
}

function buildTimelineHours(sessions: PlanningSession[]): string[] {
  if (sessions.length === 0) {
    return [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ];
  }

  const validStartHours = sessions
    .map((session) => safeDate(session.startTime)?.getHours())
    .filter((hour): hour is number => typeof hour === "number");

  const validEndHours = sessions
    .map((session) => safeDate(session.endTime)?.getHours())
    .filter((hour): hour is number => typeof hour === "number");

  if (validStartHours.length === 0 || validEndHours.length === 0) {
    return [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ];
  }

  const minHour = Math.min(...validStartHours);
  const maxHour = Math.max(...validEndHours);

  const hours: string[] = [];

  for (let hour = minHour; hour <= maxHour; hour++) {
    hours.push(`${String(hour).padStart(2, "0")}:00`);
  }

  return hours;
}

function getSessionsForRoomAndHour(
  sessions: PlanningSession[],
  roomId: number,
  hourLabel: string
): PlanningSession[] {
  const hour = Number(hourLabel.slice(0, 2));

  return sessions
    .filter((session) => {
      const sessionStart = safeDate(session.startTime);

      if (!sessionStart) {
        return false;
      }

      return getRoomId(session) === roomId && sessionStart.getHours() === hour;
    })
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
}

export default function GlobalPlanningExplorer({
  event,
  rooms,
  sessions,
}: GlobalPlanningExplorerProps) {
  const days = useMemo(
    () => getPlanningDays(event, sessions),
    [event, sessions]
  );

  const [activeDay, setActiveDay] = useState(() => getDefaultDay(days));
  const [selectedRoom, setSelectedRoom] = useState("all");

  const planningRooms = useMemo(
    () => buildPlanningRooms(rooms, sessions),
    [rooms, sessions]
  );

  const sessionsOfSelectedDay = useMemo(() => {
    if (!activeDay) {
      return sessions;
    }

    return sessions.filter((session) => dateKey(session.startTime) === activeDay);
  }, [sessions, activeDay]);

  const visibleRooms = useMemo(() => {
    if (selectedRoom === "all") {
      return planningRooms;
    }

    return planningRooms.filter((room) => room.id === Number(selectedRoom));
  }, [planningRooms, selectedRoom]);

  const filteredSessions = useMemo(() => {
    if (selectedRoom === "all") {
      return sessionsOfSelectedDay;
    }

    return sessionsOfSelectedDay.filter(
      (session) => getRoomId(session) === Number(selectedRoom)
    );
  }, [sessionsOfSelectedDay, selectedRoom]);

  const timelineHours = useMemo(
    () => buildTimelineHours(filteredSessions),
    [filteredSessions]
  );

  const gridTemplateColumns = `145px repeat(${Math.max(
    visibleRooms.length,
    1
  )}, minmax(300px, 1fr))`;

  const selectedRoomForDetails =
    selectedRoom === "all"
      ? null
      : planningRooms.find((room) => room.id === Number(selectedRoom));

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
              Global schedule
            </div>

            <h1 className="text-[42px] font-extrabold leading-none tracking-[-0.04em] text-white md:text-[56px]">
              Global schedule
            </h1>

            <p className="mt-4 max-w-[720px] text-[16px] leading-7 text-slate-300">
              Explore the full program of {event.title}, from{" "}
              {formatEventDateRange(event.startDate, event.endDate)}.
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS + TABLE */}
      <section className="event-container py-5">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center">
          <div className="inline-flex w-fit overflow-hidden rounded-xl border border-white/15 bg-white/[0.03]">
            {days.length === 0 ? (
              <button
                type="button"
                className="min-w-[128px] bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] px-6 py-3 text-[15px] font-semibold text-white"
              >
                No date
              </button>
            ) : (
              days.map((day) => {
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
              })
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center xl:ml-10">
            <div className="relative w-full sm:w-[260px]">
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
                  All rooms
                </option>

                {planningRooms.map((room) => (
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

            {selectedRoomForDetails ? (
              <a
                href={`/events/${event.id}/rooms/${selectedRoomForDetails.id}`}
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-violet-400/50 bg-violet-600/20 px-5 text-[15px] font-semibold text-violet-100 transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-600/35"
              >
                <Building2 size={17} />
                Room details
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex h-[52px] cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-[15px] font-semibold text-white/35"
              >
                <Building2 size={17} />
                Room details
              </button>
            )}
          </div>
        </div>


        <div className="overflow-x-auto rounded-[22px] border border-white/20 bg-[#081120]/90 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="min-w-[1100px]">
            <div
              className="grid border-b border-white/15"
              style={{ gridTemplateColumns }}
            >
              <div className="flex h-[58px] items-center justify-center border-r border-white/15 text-[14px] text-slate-300">
                Time
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

            {timelineHours.map((hour) => (
              <div
                key={hour}
                className="grid min-h-[92px] border-b border-white/10 last:border-b-0"
                style={{ gridTemplateColumns }}
              >
                <div className="flex items-start justify-center border-r border-white/15 pt-5 text-[14px] text-slate-300">
                  {hour}
                </div>

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
                          const live =
                            session.live ??
                            isSessionLive(session.startTime, session.endTime);

                          return (
                            <a
                              key={session.id}
                              href={`/sessions/${session.id}`}
                              className={[
                                "block rounded-xl border px-4 py-3 transition hover:-translate-y-0.5",
                                live
                                  ? "border-[#ff445c]/60 bg-[linear-gradient(90deg,rgba(255,68,92,0.16),rgba(27,26,57,0.95))] shadow-[0_12px_35px_rgba(255,68,92,0.14)]"
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

                                <h3 className="line-clamp-1 text-[15px] font-bold leading-tight text-white">
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
                                  {getSpeakerName(session)}
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="flex items-center justify-center gap-8 border-t border-white/10 py-4 text-[14px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[#ff445c]" />
                <span className="font-semibold text-[#ff5c72]">LIVE</span>
                <span>Current session</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-violet-500" />
                <span>Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        {filteredSessions.length === 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center text-slate-300">
            No session available for this day and room.
          </div>
        )}
      </section>
    </main>
  );
}
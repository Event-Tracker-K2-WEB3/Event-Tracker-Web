import { CalendarDays } from "lucide-react";
import Link from "next/link";

import type { EventSession } from "@/app/services/eventService";
import { EventSessionCard } from "./EventSessionCard";

interface EventSessionsProps {
    sessions: EventSession[];
    eventId: string;
}

export const EventSessions = ({ sessions, eventId }: EventSessionsProps) => {
    if (!sessions || sessions.length === 0) {
        return null;
    }

    return (
        <section className="mt-5 sm:mt-6" aria-labelledby="event-sessions-title">
            <div className="mb-3">
                <h2
                    id="event-sessions-title"
                    className="text-lg sm:text-xl font-bold text-event-text"
                >
                    Sessions
                </h2>

                <div className="mt-1.5 h-0.5 w-10 rounded-full bg-event-primary" />
            </div>

            <div className="rounded-xl border border-white/15 bg-[#0b1020]/72 p-3 sm:p-4 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="space-y-3">
                    {sessions.map((session) => (
                        <EventSessionCard key={session.id} session={session} />
                    ))}
                </div>

                <div className="mt-4 flex justify-center">
                    <Link
                        href={`/events/${eventId}/planning`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-event-primary/50 px-4 py-2 text-xs font-semibold text-event-primary transition hover:bg-event-primary/10 hover:text-event-primary-light"
                    >
                        <CalendarDays size={14} />
                        Voir le programme complet
                    </Link>
                </div>
            </div>
        </section>
    );
};
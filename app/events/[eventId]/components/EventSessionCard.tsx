import { MapPin } from "lucide-react";
import Link from "next/link";

import type { EventSession } from "@/app/services/eventService";

interface EventSessionCardProps {
    session: EventSession;
}

function formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export const EventSessionCard = ({ session }: EventSessionCardProps) => {
    return (
        <Link
            href={`/sessions/${session.id}`}
            aria-label={`View session ${session.title}`}
            className="group block rounded-xl border border-white/10 bg-[#09101f]/78 p-3 transition hover:border-event-primary/45 hover:bg-[#11182a]/85"
        >
            <article className="grid gap-3 sm:grid-cols-[92px_1fr_120px] sm:items-center">
                <div className="flex h-[72px] w-[92px] shrink-0 flex-col items-center justify-center rounded-lg bg-[#3b0754] text-center shadow-[inset_0_0_28px_rgba(168,85,247,0.16)]">
                    <span className="text-sm font-bold text-event-text">
                        {formatTime(session.startTime)}
                    </span>

                    <span className="my-0.5 text-xs leading-none text-event-muted">
                        -
                    </span>

                    <span className="text-sm font-medium text-event-text/80">
                        {formatTime(session.endTime)}
                    </span>
                </div>

                <div className="min-w-0">
                    <h3 className="line-clamp-1 text-sm sm:text-base font-bold text-event-text transition group-hover:text-event-primary-light">
                        {session.title}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm leading-5 text-event-muted">
                        {session.description || "No description available."}
                    </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:justify-end text-event-muted">
                    <MapPin size={14} className="shrink-0 text-event-primary" />
                    <span className="line-clamp-1">
                        {session.roomName || "Room to be confirmed"}
                    </span>
                </div>
            </article>
        </Link>
    );
};
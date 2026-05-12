import Link from "next/link";
import { EventItem } from "../data/events";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link href={`/events/${event.id}`} className="group overflow-hidden rounded-2xl glass-card transition hover:-translate-y-1 hover:border-event-border-purple/70">
      <div className={`relative h-36 bg-gradient-to-br ${event.visual}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_16rem)]" />
        <div className="absolute left-4 top-4 rounded-xl border border-event-accent/80 bg-event-bg/50 px-3 py-2 text-center backdrop-blur-md">
          <p className="text-xl font-black leading-none">{event.day}</p>
          <p className="text-xs font-bold uppercase">{event.month}</p>
        </div>
        {event.live && (
          <span className="absolute right-4 top-4 rounded-full bg-event-live px-3 py-1 text-xs font-black text-white shadow-lg shadow-event-live/30">
            ● LIVE
          </span>
        )}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-event-text group-hover:text-event-accent">{event.title}</h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-event-muted">{event.description}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-event-muted">
          <span>⌖ {event.city}, {event.country}</span>
          <span>▣ {event.dateLabel}</span>
        </div>
      </div>
    </Link>
  );
}

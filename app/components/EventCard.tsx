import Link from 'next/link';
import { MapPin, Calendar } from "lucide-react"
import type { Event } from '../services/eventService';
import { FavoriteButton } from './FavoriteButton';

function formatDay(dateString: string): string {
  return new Date(dateString).getDate().toString();
}

function formatMonth(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
}

function formatDateRange(startDateStr: string, endDateStr: string): string {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = start.toLocaleDateString('en-US', { month: 'long' });
  const year = start.getFullYear();

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${startDay} - ${endDay} ${month} ${year}`;
  }

  const endMonth = end.toLocaleDateString('en-US', { month: 'long' });
  return `${startDay} ${month} - ${endDay} ${endMonth} ${year}`;
}

function isEventLive(startDateStr: string, endDateStr: string): boolean {
  const now = new Date();
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  return now >= start && now <= end;
}

export function EventCard({ event, index = 0 }: { event: Event; index?: number }) {
  const isLive = isEventLive(event.startDate, event.endDate);

  return (
    <Link
      href={`/events/${event.id}`}
      style={{ animationDelay: `${index * 90}ms` }}
      className="animate-fade-up event-glass group overflow-hidden rounded-xl border border-event-border transition hover:-translate-y-0.5 hover:border-event-primary/50"
    >

      <div
        className="relative h-24 overflow-hidden bg-gradient-to-br from-event-primary/30 via-event-primary/10 to-event-secondary/20"
        style={{
          backgroundImage: event.imageUrl ? `url(${event.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute left-3 top-3 rounded-lg border border-event-accent/60 bg-event-bg/60 px-2 py-1.5 text-center backdrop-blur-md">
          <p className="text-lg font-black leading-none text-event-text">
            {formatDay(event.startDate)}
          </p>
          <p className="text-[10px] font-black uppercase text-event-text tracking-wide">
            {formatMonth(event.startDate)}
          </p>
        </div>

        {isLive && (
          <div className="absolute right-3 top-3 rounded-full bg-event-live px-2 py-0.5 flex items-center gap-1 shadow-lg shadow-event-live/30">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span className="text-[10px] font-black text-white uppercase tracking-wide">Live</span>
          </div>
        )}
      </div>

      <div className="p-3 space-y-1.5">

        <h3 className="text-sm font-bold text-event-text group-hover:text-event-primary transition-colors line-clamp-1">
          {event.title}
        </h3>

        <p className="text-xs text-event-muted leading-relaxed line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-1 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-event-muted">
            <MapPin className="text-event-primary" size={12} />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-event-muted">
            <Calendar className="text-event-primary" size={12} />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
        </div>
      </div>

      <FavoriteButton event={event} />

    </Link>
  );
}
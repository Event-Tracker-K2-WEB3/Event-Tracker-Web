'use client';

import Link from 'next/link';
import type { Event } from '../services/eventService';

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatMonth(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase();
}

function formatDay(dateString: string): string {
    const date = new Date(dateString);
    return date.getDate().toString();
}

export function EventList({ events }: { events: Event[] }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
                const isLive = new Date(event.startDate) <= new Date() && new Date(event.endDate) >= new Date();

                return (
                    <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className="group overflow-hidden rounded-2xl border border-event-border bg-event-card transition hover:-translate-y-1 hover:border-event-primary/50"
                    >
                        <div className="relative h-36 bg-gradient-to-br from-event-primary/20 to-event-secondary/20">
                            <div className="absolute left-4 top-4 rounded-xl border border-event-accent/80 bg-event-bg/50 px-3 py-2 text-center backdrop-blur-md">
                                <p className="text-xl font-black leading-none text-event-text">{formatDay(event.startDate)}</p>
                                <p className="text-xs font-bold uppercase text-event-muted">{formatMonth(event.startDate)}</p>
                            </div>
                            {isLive && (
                                <span className="absolute right-4 top-4 rounded-full bg-event-live px-3 py-1 text-xs font-black text-white shadow-lg">
                                    ● LIVE
                                </span>
                            )}
                        </div>
                        <div className="space-y-4 p-5">
                            <h3 className="text-lg font-bold text-event-text group-hover:text-event-primary">
                                {event.title}
                            </h3>
                            <p className="text-sm leading-6 text-event-muted line-clamp-2">
                                {event.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-event-muted">
                                <span>⌖ {event.location}</span>
                                <span>▣ {formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
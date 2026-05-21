'use client';

import Image from 'next/image';
import { useMemo, useSyncExternalStore } from 'react';
import { MapPin, Clock, Calendar, Trash2 } from 'lucide-react';

interface FavoriteSession {
    id: string;
    title: string;
    event: string;
    date: string;
    dateDay: string;
    dateMonth: string;
    startTime: string;
    endTime: string;
    room: string;
    imagePath?: string;
}

const FAVORITES_KEY = 'eventsync_favorites';

function subscribe(callback: () => void) {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
}

function getFavoritesSnapshot() {
    return localStorage.getItem(FAVORITES_KEY) ?? '[]';
}

function getServerSnapshot() {
    return '[]';
}

export function FavoriteSection() {
    const favoritesSnapshot = useSyncExternalStore(
        subscribe,
        getFavoritesSnapshot,
        getServerSnapshot
    );

    const favorites = useMemo<FavoriteSession[]>(() => {
        try {
            return JSON.parse(favoritesSnapshot) as FavoriteSession[];
        } catch {
            return [];
        }
    }, [favoritesSnapshot]);

    const removeFavorite = (id: string) => {
        const updated = favorites.filter((item) => item.id !== id);

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    if (favorites.length === 0) {
        return (
            <div className="max-w-5xl mx-auto">
                <div className="text-center py-16 bg-event-surface/30 rounded-xl border border-event-border backdrop-blur-md">
                    <Calendar size={28} className="mx-auto mb-4 text-event-primary" />
                    <p className="text-event-muted text-sm">
                        Aucun favori enregistré pour le moment.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 max-w-5xl mx-auto">
            {favorites.map((session) => (
                <div
                    key={session.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b111d]/80 hover:bg-[#101827]/90 hover:border-event-primary/40 transition-all duration-300"
                >
                    <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-[260px] h-[170px] md:h-[150px] shrink-0 overflow-hidden bg-[#111827]">
                            {session.imagePath ? (
                                <Image
                                    src={session.imagePath}
                                    alt={session.title}
                                    fill
                                    className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#27145f] via-[#111827] to-[#050816]" />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                            <div className="absolute left-4 top-4 w-[62px] rounded-xl border border-event-primary/70 bg-[#080b14]/85 backdrop-blur-md px-2 py-3 text-center shadow-[0_0_25px_rgba(124,58,237,0.35)]">
                                <p className="text-2xl leading-none font-black text-white">
                                    {session.dateDay}
                                </p>

                                <p className="mt-1 text-[10px] leading-none font-bold uppercase text-white/80">
                                    {session.dateMonth}
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0 p-5 flex items-center justify-between gap-5">
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-event-primary mb-2">
                                    {session.event}
                                </p>

                                <h3 className="text-xl font-black text-white truncate group-hover:text-event-primary-light transition">
                                    {session.title}
                                </h3>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-5 text-sm text-gray-400">
                                    <span className="flex items-center gap-2">
                                        <Clock size={15} />
                                        {session.startTime} - {session.endTime}
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <MapPin size={15} className="text-event-primary" />
                                        {session.room}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFavorite(session.id)}
                                className="w-12 h-12 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center justify-center transition-all duration-300 shrink-0 hover:scale-105"
                                title="Supprimer des favoris"
                            >
                                <Trash2 size={21} strokeWidth={2.2} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
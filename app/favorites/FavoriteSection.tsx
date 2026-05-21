'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import {
    CalendarHeart,
    Clock,
    Heart,
    MapPin,
    Trash2,
} from 'lucide-react';

interface FavoriteItem {
    id: string;
    title: string;
    event: string;
    date?: string;
    dateDay?: string;
    dateMonth?: string;
    dateYear?: string;
    startTime: string;
    endTime: string;
    room: string;
    startDate?: string;
    endDate?: string;
    href?: string;
    imagePath?: string;
}

const FAVORITES_KEY = 'eventsync_favorites';

type FilterType = 'all' | 'upcoming' | 'past';

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

function getDateFromItem(item: FavoriteItem): Date | null {
    if (item.endDate) {
        return new Date(item.endDate);
    }

    if (item.startDate) {
        return new Date(item.startDate);
    }

    return null;
}

function isPast(item: FavoriteItem): boolean {
    const date = getDateFromItem(item);

    if (!date || Number.isNaN(date.getTime())) {
        return false;
    }

    return date < new Date();
}

function getDay(item: FavoriteItem): string {
    if (item.dateDay) return item.dateDay;

    if (item.startDate) {
        return new Date(item.startDate).getDate().toString().padStart(2, '0');
    }

    if (item.date) {
        return item.date.split(' ')[0] ?? '';
    }

    return '';
}

function getMonth(item: FavoriteItem): string {
    if (item.dateMonth) return item.dateMonth;

    if (item.startDate) {
        return new Date(item.startDate)
            .toLocaleDateString('fr-FR', { month: 'short' })
            .replace('.', '')
            .toUpperCase();
    }

    if (item.date) {
        return item.date.split(' ')[1]?.replace('.', '').toUpperCase() ?? '';
    }

    return '';
}

function getYear(item: FavoriteItem): string {
    if (item.dateYear) return item.dateYear;

    if (item.startDate) {
        return new Date(item.startDate).getFullYear().toString();
    }

    if (item.date) {
        const parts = item.date.split(' ');
        return parts[2] ?? '';
    }

    return '';
}

export function FavoriteSection() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const favoritesSnapshot = useSyncExternalStore(
        subscribe,
        getFavoritesSnapshot,
        getServerSnapshot
    );

    const favorites = useMemo<FavoriteItem[]>(() => {
        try {
            return JSON.parse(favoritesSnapshot) as FavoriteItem[];
        } catch {
            return [];
        }
    }, [favoritesSnapshot]);

    const upcomingFavorites = useMemo(
        () => favorites.filter((item) => !isPast(item)),
        [favorites]
    );

    const pastFavorites = useMemo(
        () => favorites.filter((item) => isPast(item)),
        [favorites]
    );

    const visibleFavorites = useMemo(() => {
        if (activeFilter === 'upcoming') return upcomingFavorites;
        if (activeFilter === 'past') return pastFavorites;
        return favorites;
    }, [activeFilter, favorites, upcomingFavorites, pastFavorites]);

    const removeFavorite = (id: string) => {
        const updated = favorites.filter((item) => item.id !== id);

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const clearFavorites = () => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <section className="w-full">
            {/* HERO */}
            <div className="border-b border-white/10 bg-[#050716]">
                <div className="event-container grid min-h-[230px] grid-cols-1 items-center gap-10 py-12 lg:grid-cols-[1fr_360px]">
                    <div className="flex items-center gap-6">
                        <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400 shadow-[0_0_45px_rgba(124,58,237,0.25)] sm:flex">
                            <Heart size={36} fill="currentColor" />
                        </div>

                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                                Mes <span className="text-event-primary-light">favoris</span>
                            </h1>

                            <p className="mt-4 max-w-xl text-base leading-7 text-event-muted">
                                Retrouvez ici toutes les sessions que vous avez ajoutées à vos favoris.
                            </p>
                        </div>
                    </div>

                    <div className="relative hidden h-[170px] lg:block">
                        <Image
                            src="/favorisIMG.png"
                            alt="Illustration favoris"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="event-container py-8">
                <div className="mb-6 flex flex-col justify-between gap-5 border-b border-white/10 pb-4 md:flex-row md:items-center">
                    <div className="flex items-center gap-8">
                        <button
                            type="button"
                            onClick={() => setActiveFilter('all')}
                            className={`relative pb-4 text-sm font-semibold transition ${
                                activeFilter === 'all'
                                    ? 'text-event-primary-light'
                                    : 'text-event-muted hover:text-white'
                            }`}
                        >
                            Toutes ({favorites.length})
                            {activeFilter === 'all' && (
                                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-event-primary-light" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveFilter('upcoming')}
                            className={`relative pb-4 text-sm font-semibold transition ${
                                activeFilter === 'upcoming'
                                    ? 'text-event-primary-light'
                                    : 'text-event-muted hover:text-white'
                            }`}
                        >
                            À venir ({upcomingFavorites.length})
                            {activeFilter === 'upcoming' && (
                                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-event-primary-light" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveFilter('past')}
                            className={`relative pb-4 text-sm font-semibold transition ${
                                activeFilter === 'past'
                                    ? 'text-event-primary-light'
                                    : 'text-event-muted hover:text-white'
                            }`}
                        >
                            Passées ({pastFavorites.length})
                            {activeFilter === 'past' && (
                                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-event-primary-light" />
                            )}
                        </button>
                    </div>

                    {favorites.length > 0 && (
                        <button
                            type="button"
                            onClick={clearFavorites}
                            className="inline-flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-event-muted transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <Trash2 size={17} />
                            Tout supprimer
                        </button>
                    )}
                </div>

                {visibleFavorites.length === 0 ? (
                    <EmptyFavoriteState />
                ) : (
                    <div className="space-y-5">
                        {visibleFavorites.map((item) => (
                            <article
                                key={item.id}
                                onClick={() => router.push(item.href ?? `/events/${item.id}`)}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0b111d]/80 transition-all duration-300 hover:border-event-primary/40 hover:bg-[#101827]/90"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative h-[170px] shrink-0 overflow-hidden bg-[#111827] md:h-[170px] md:w-[360px]">
                                        <Image
                                            src={item.imagePath ?? '/home-ger.png'}
                                            alt={item.title}
                                            fill
                                            className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />

                                        <div className="absolute left-6 top-6 flex w-[86px] flex-col items-center justify-center rounded-xl border border-event-primary/80 bg-[#080b14]/85 px-3 py-4 text-center shadow-[0_0_25px_rgba(124,58,237,0.45)] backdrop-blur-md">
                                            <span className="text-3xl font-black leading-none text-white">
                                                {getDay(item)}
                                            </span>

                                            <span className="mt-1 text-sm font-bold uppercase leading-none text-white">
                                                {getMonth(item)}
                                            </span>

                                            <span className="mt-1 text-xs font-medium leading-none text-white/70">
                                                {getYear(item)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex min-w-0 flex-1 items-center justify-between gap-6 p-7">
                                        <div className="min-w-0">
                                            <h3 className="text-xl font-black text-white transition group-hover:text-event-primary-light md:text-2xl">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-base font-semibold text-event-primary-light">
                                                {item.event}
                                            </p>

                                            <div className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-event-muted">
                                                <span className="flex items-center gap-2">
                                                    <Clock size={17} />
                                                    {item.startTime} - {item.endTime}
                                                </span>

                                                <span className="hidden h-7 w-px bg-white/10 sm:block" />

                                                <span className="flex items-center gap-2">
                                                    <MapPin size={17} className="text-event-primary" />
                                                    {item.room}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                removeFavorite(item.id);
                                            }}
                                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-500 transition-all duration-300 hover:scale-105 hover:bg-red-500/20 hover:text-red-400"
                                            title="Retirer des favoris"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}

                        <EmptyFavoriteCta />
                    </div>
                )}
            </div>
        </section>
    );
}

function EmptyFavoriteState() {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#0b111d]/70 px-6 py-20 text-center">
            <CalendarHeart size={38} className="mx-auto mb-5 text-event-primary" />

            <p className="text-event-muted">
                Aucun favori trouvé dans cette catégorie.
            </p>

            <Link
                href="/events"
                className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl border border-event-primary/70 px-7 py-3 text-sm font-semibold text-event-primary-light transition hover:bg-event-primary/10"
            >
                <CalendarHeart size={18} />
                Voir le programme
            </Link>
        </div>
    );
}

function EmptyFavoriteCta() {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#07111f]/70 px-6 py-16 text-center">
            <CalendarHeart size={38} className="mx-auto mb-5 text-event-primary" />

            <p className="text-event-muted">
                Vous n’avez pas encore ajouté de session en favori.
                <br />
                Parcourez le programme et ajoutez vos sessions préférées !
            </p>

            <Link
                href="/events"
                className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl border border-event-primary/70 px-7 py-3 text-sm font-semibold text-event-primary-light transition hover:bg-event-primary/10"
            >
                <CalendarHeart size={18} />
                Voir le programme
            </Link>
        </div>
    );
}
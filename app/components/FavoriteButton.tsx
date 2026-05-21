'use client';

import { useEffect, useState, startTransition } from 'react';
import type { Event } from '../services/eventService';

interface FavoriteEvent {
    id: string;
    title: string;
    event: string;
    date: string;
    dateDay: string;
    dateMonth: string;
    dateYear: string;
    startTime: string;
    endTime: string;
    room: string;
    startDate: string;
    endDate: string;
    href: string;
    imagePath?: string;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function formatDateDay(dateString: string): string {
    return new Date(dateString).getDate().toString().padStart(2, '0');
}

function formatDateMonth(dateString: string): string {
    return new Date(dateString)
        .toLocaleDateString('fr-FR', { month: 'short' })
        .replace('.', '')
        .toUpperCase();
}

function formatDateYear(dateString: string): string {
    return new Date(dateString).getFullYear().toString();
}

export function FavoriteButton({ event }: { event: Event }) {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const checkFavoriteStatus = () => {
            const saved = localStorage.getItem('eventsync_favorites');

            if (saved) {
                const parsed = JSON.parse(saved) as FavoriteEvent[];

                startTransition(() => {
                    setIsFavorite(parsed.some((item) => item.id === event.id));
                });
            } else {
                startTransition(() => {
                    setIsFavorite(false);
                });
            }
        };

        checkFavoriteStatus();

        window.addEventListener('storage', checkFavoriteStatus);

        return () => window.removeEventListener('storage', checkFavoriteStatus);
    }, [event.id]);

    const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (typeof window === 'undefined') return;

        const saved = localStorage.getItem('eventsync_favorites');
        let currentFavorites: FavoriteEvent[] = saved ? JSON.parse(saved) : [];

        const exists = currentFavorites.some((item) => item.id === event.id);

        if (exists) {
            currentFavorites = currentFavorites.filter((item) => item.id !== event.id);
            setIsFavorite(false);
        } else {
            currentFavorites.push({
                id: event.id,
                title: event.title,
                event: 'Événement',
                date: formatDate(event.startDate),
                dateDay: formatDateDay(event.startDate),
                dateMonth: formatDateMonth(event.startDate),
                dateYear: formatDateYear(event.startDate),
                startTime: new Date(event.startDate).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                endTime: new Date(event.endDate).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                room: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
                href: `/events/${event.id}`,
                imagePath: '/home-ger.png',
            });

            setIsFavorite(true);
        }

        localStorage.setItem('eventsync_favorites', JSON.stringify(currentFavorites));
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <button
            onClick={toggleFavorite}
            type="button"
            className={`absolute bottom-3 right-3 z-30 size-9 rounded-full border flex items-center justify-center transition-all duration-200 shadow-md ${
                isFavorite
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400 scale-105'
                    : 'bg-[#12121a]/80 border-white/5 text-white/50 hover:text-purple-400 hover:border-purple-500/40 backdrop-blur-sm'
            }`}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>
        </button>
    );
}
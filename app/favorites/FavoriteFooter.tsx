import Link from "next/link";

export default function FavoriteFooter() {
    return (
        <footer className="w-full border-t border-white/5 bg-[#0a0a0f] mt-20">
            <div className="event-container px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-event-muted">
                <div>
                    <span className="font-bold text-event-text">Event<span className="text-event-primary-light">Sync</span></span> © {new Date().getFullYear()} - Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
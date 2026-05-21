import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FavoriteSection } from "./FavoriteSection";
import FavoriteFooter from "./FavoriteFooter";

export default function FavoritesPage() {
    return (
        <div className="min-h-screen bg-event-bg text-event-text flex flex-col justify-between">
            <main className="flex-1 px-12 py-12 event-container w-full">

                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-xs text-event-muted hover:text-event-text transition mb-6"
                >
                    <ArrowLeft size={12} />
                    <span>Retour aux événements</span>
                </Link>

                <div className="mb-10 border-b border-white/5 pb-6 max-w-5xl mx-auto flex items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-event-text">
                            Mes <span className="text-event-primary-light">favoris</span>
                        </h1>

                        <p className="text-xs text-event-muted mt-1.5">
                            Gérez vos sessions enregistrées et consultez vos plannings personnalisés.
                        </p>
                    </div>

                    <div className="relative w-50 h-50 hidden md:block shrink-0">
                        <Image
                            src="/favorisIMG.png"
                            alt="Décoration favoris"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <FavoriteSection />
            </main>

            <FavoriteFooter />
        </div>
    );
}
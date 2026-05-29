import { FavoriteSection } from './FavoriteSection';
import FavoriteFooter from './FavoriteFooter';

export default function FavoritesPage() {
    return (
        <div className="min-h-screen bg-event-bg text-event-text overflow-x-hidden">
            <style>
                {`
                    @keyframes pageFadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(28px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes footerFadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(18px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .favorites-page-animation {
                        opacity: 0;
                        animation: pageFadeUp 0.8s ease-out forwards;
                    }

                    .favorites-footer-animation {
                        opacity: 0;
                        animation: footerFadeUp 0.7s ease-out forwards;
                        animation-delay: 0.35s;
                    }
                `}
            </style>

            <div className="favorites-page-animation">
                <FavoriteSection />
            </div>

            <div className="favorites-footer-animation">
                <FavoriteFooter />
            </div>
        </div>
    );
}
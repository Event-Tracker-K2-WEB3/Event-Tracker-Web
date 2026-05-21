import { FavoriteSection } from './FavoriteSection';
import FavoriteFooter from './FavoriteFooter';

export default function FavoritesPage() {
    return (
        <div className="min-h-screen bg-event-bg text-event-text">
            <FavoriteSection />
            <FavoriteFooter />
        </div>
    );
}
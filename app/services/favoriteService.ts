import type { Session } from "@/app/services/sessionService";

export const FAVORITES_STORAGE_KEY = "eventsync_favorites";

export function getFavoriteSessions(): Session[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!rawFavorites) {
    return [];
  }

  try {
    const parsedFavorites = JSON.parse(rawFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites;
  } catch (error) {
    console.error("Erreur lecture favoris :", error);
    return [];
  }
}

export function saveFavoriteSessions(favorites: Session[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(favorites)
  );
}

export function toggleFavoriteSession(session: Session): boolean {
  const favorites = getFavoriteSessions();

  const alreadyExists = favorites.some(
    (favorite) => favorite.id === session.id
  );

  if (alreadyExists) {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== session.id
    );

    saveFavoriteSessions(updatedFavorites);
    return false;
  }

  saveFavoriteSessions([...favorites, session]);
  return true;
}
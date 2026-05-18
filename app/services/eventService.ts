const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

type EventPageResponse = {
  content: Event[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const eventService = {
  getAllEvents: async (): Promise<Event[]> => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`);
    }

    const data: EventPageResponse = await response.json();

    return data.content;
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`);
    }

    return response.json();
  },
};
const API_BASE_URL = 'http://localhost:8080';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface PaginatedResponse {
  content: Event[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const eventService = {
  getAllEvents: async (page: number = 1, limit: number = 8, search?: string, date?: string): Promise<PaginatedResponse> => {
    let url = `${API_BASE_URL}/events?page=${page}&size=${limit}`;
    if (search && search.trim()) {
      url += `&q=${encodeURIComponent(search)}`;
    }
    if (date && date !== "all") {
      url += `&date=${encodeURIComponent(date)}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }
    return response.json()
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return response.json();
  },
  
  searchEvents: async (
    query: string,
    page: number = 1,
    limit: number = 8
  ): Promise<PaginatedResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/events?page=${page}&size=${limit}&q=${encodeURIComponent(query)}`
    );
  
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }
  
    return response.json();
  },
};
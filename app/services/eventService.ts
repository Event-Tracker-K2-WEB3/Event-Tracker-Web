const API_BASE_URL = 'http://localhost:8080';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

export const eventService = {
  getAllEvents: async (): Promise<Event[]> => {
    const response = await fetch(`${API_BASE_URL}/events`);
    
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }
    
    return response.json();
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }
    
    return response.json();
  },
};
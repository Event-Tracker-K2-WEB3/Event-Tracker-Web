const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface SessionEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface SessionRoom {
  id: number;
  name: string;
}

export interface SessionSpeaker {
  id: number;
  name: string;
  role: string;
  specialty: string;
  company: string;
  bio: string;
  photo: string | null;
  initials: string;
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
  day: string | null;
  sessionType: string | null;
}

export interface Session {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: string;
  capacity: number | null;
  event: SessionEvent;
  room: SessionRoom | null;
  speaker: SessionSpeaker | null;
}

export async function getSessionsByEvent(eventId: string): Promise<Session[]> {
  const res = await fetch(`${API_URL}/events/${eventId}/sessions`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur récupération des sessions : ${res.status}`);
  }

  return res.json();
}
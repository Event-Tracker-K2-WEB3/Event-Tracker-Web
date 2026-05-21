export interface SessionSpeaker {
  id: number;
  name: string;
  role: string;
}

export interface SessionLink {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export interface SessionDetail {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  date: string;
  startDate: string;
  endDate: string;
  room: string;
  status: string;
  image: string;
  speaker: SessionSpeaker;
  previousSession?: SessionLink;
  nextSession?: SessionLink;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getSessionById(id: number | string): Promise<SessionDetail> {
  const res = await fetch(`${API_URL}/sessions/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Session introuvable: ${res.status}`);
  }

  return res.json();
}
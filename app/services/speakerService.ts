export interface Speaker {
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
  day: string;
  sessionType: string;
  sessions: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getSpeakers(): Promise<Speaker[]  > {

  const res = await fetch(`${API_URL}/speakers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur récupération intervenants: ${res.status}`);
  }

  return res.json();
}

export async function getSpeakerById(id: number): Promise<Speaker> {
  const res = await fetch(`${API_URL}/speakers/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Intervenant introuvable: ${res.status}`);
  }

  return res.json();
}
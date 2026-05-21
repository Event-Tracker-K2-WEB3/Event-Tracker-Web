const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export type SpeakerSession = {
  id: number;
  title: string;
  description: string;
  type: string;
  startTime: string;
  endTime: string;
  capacity: number;
  eventId: string;
  eventTitle: string;
  roomId: number;
  roomName: string;
};

export type Speaker = {
  id: number;
  name: string;
  role: string;
  specialty: string;
  company: string;
  bio: string;
  photo: string;
  initials: string;
  linkedin: string;
  twitter: string;
  website: string;
  day: string;
  sessionType: string;
  sessionCount: number;
};

export type SpeakerDetails = Speaker & {
  sessions: SpeakerSession[];
};

export async function getSpeakers(): Promise<Speaker[]> {
  const response = await fetch(`${API_BASE_URL}/speakers`, {

    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch speakers");
  }

  return response.json();
}

export async function getSpeakerById(id: string): Promise<SpeakerDetails> {
  const response = await fetch(`${API_BASE_URL}/speakers/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch speaker details");
  }

  return response.json();
}
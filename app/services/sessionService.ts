const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export type SessionSpeaker = {
  id: number;
  name: string;
  role: string;
  specialty: string;
  company: string;
  photo?: string | null;
  initials: string;
};

export type SessionDetails = {
  id: number;
  title: string;
  description: string;
  type: string;
  image?: string | null;
  startTime: string;
  endTime: string;
  capacity: number;
  eventId: string;
  eventTitle: string;
  roomId: number;
  roomName: string;
  live: boolean;
  speakers: SessionSpeaker[];
};

export async function getSessionById(id: string): Promise<SessionDetails> {
  const response = await fetch(`${API_BASE_URL}/sessions/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch session details");
  }

  return response.json();
}
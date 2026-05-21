const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface RoomEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface RoomSpeaker {
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

export interface RoomSession {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: string;
  capacity: number | null;
  event: RoomEvent;
  speaker: RoomSpeaker | null;
}

export interface Room {
  id: number;
  name: string;
  sessions: RoomSession[];
}

export async function getRooms(): Promise<Room[]> {
  const res = await fetch(`${API_URL}/rooms`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur récupération des salles : ${res.status}`);
  }

  return res.json();
}

export async function getRoomById(id: number): Promise<Room> {
  const rooms = await getRooms();

  const room = rooms.find((room) => room.id === id);

  if (!room) {
    throw new Error("Salle introuvable");
  }

  return room;
}
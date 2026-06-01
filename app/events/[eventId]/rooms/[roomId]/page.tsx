import { notFound } from "next/navigation";

import RoomPlanningExplorer from "@/app/components/RoomPlanningExplorer";
import {
  eventService,
  type Event,
  type EventSession,
} from "@/app/services/eventService";
import {
  getRooms,
  type Room,
  type RoomSession,
} from "@/app/services/roomService";

interface Props {
  params: Promise<{
    eventId: string;
    roomId: string;
  }>;
}

type EventSessionWithExtra = EventSession & {
  type?: string | null;
  capacity?: number | null;
};

function convertToRoomSession(
  session: EventSessionWithExtra,
  event: Event
): RoomSession {
  return {
    id: session.id,
    title: session.title,
    description: session.description,
    startTime: session.startTime,
    endTime: session.endTime,
    type: session.type ?? "Session",
    capacity: session.capacity ?? null,
    event: {
      id: event.id,
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
    },
    speaker: null,
  };
}

function buildRoomsFromEventSessions(
  existingRooms: Room[],
  sessions: EventSessionWithExtra[]
): Room[] {
  const roomsMap = new Map<number, Room>();

  existingRooms.forEach((room) => {
    roomsMap.set(room.id, room);
  });

  sessions.forEach((session) => {
    if (session.roomId === null) {
      return;
    }

    if (!roomsMap.has(session.roomId)) {
      roomsMap.set(session.roomId, {
        id: session.roomId,
        name: session.roomName ?? `Room ${session.roomId}`,
        sessions: [],
      });
    }
  });

  return Array.from(roomsMap.values()).sort((a, b) => a.id - b.id);
}

export default async function RoomPlanningPage({ params }: Props) {
  const { eventId, roomId } = await params;

  const roomIdNumeric = Number(roomId);

  if (Number.isNaN(roomIdNumeric)) {
    notFound();
  }

  try {
    const [event, roomsFromApi, eventSessions] = await Promise.all([
      eventService.getEventById(eventId),
      getRooms().catch(() => []),
      eventService.getSessionsByEventId(eventId),
    ]);

    const sessionsWithExtra = eventSessions as EventSessionWithExtra[];

    const rooms = buildRoomsFromEventSessions(
      roomsFromApi,
      sessionsWithExtra
    );

    const activeRoomFromApi = rooms.find(
      (room) => room.id === roomIdNumeric
    );

    const firstSessionOfRoom = sessionsWithExtra.find(
      (session) => session.roomId === roomIdNumeric
    );

    const activeRoom: Room =
      activeRoomFromApi ??
      {
        id: roomIdNumeric,
        name: firstSessionOfRoom?.roomName ?? `Room ${roomIdNumeric}`,
        sessions: [],
      };

    const roomSessions = sessionsWithExtra
      .filter((session) => session.roomId === roomIdNumeric)
      .map((session) => convertToRoomSession(session, event))
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() -
          new Date(b.startTime).getTime()
      );

    return (
      <RoomPlanningExplorer
        event={event}
        rooms={rooms}
        activeRoom={activeRoom}
        sessions={roomSessions}
      />
    );
  } catch (error) {
    console.error("Error loading room page:", error);
    notFound();
  }
}
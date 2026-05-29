import { notFound } from "next/navigation";

import RoomPlanningExplorer from "@/app/components/RoomPlanningExplorer";
import { eventService } from "@/app/services/eventService";
import { getRooms } from "@/app/services/roomService";
import { getSessionsByRoom } from "@/app/services/sessionService";

interface Props {
  params: Promise<{
    eventId: string;
    roomId: string;
  }>;
}

function getSessionEventId(session: {
  event?: { id?: string } | null;
  eventId?: string;
}) {
  return session.eventId ?? session.event?.id ?? null;
}

export default async function RoomPlanningPage({ params }: Props) {
  const { eventId, roomId } = await params;

  const roomIdNumeric = Number(roomId);

  if (Number.isNaN(roomIdNumeric)) {
    notFound();
  }

  try {
    const [event, rooms, sessionsByRoom] = await Promise.all([
      eventService.getEventById(eventId),
      getRooms(),
      getSessionsByRoom(roomIdNumeric),
    ]);

    const activeRoom = rooms.find((room) => room.id === roomIdNumeric);

    if (!activeRoom) {
      notFound();
    }

    const roomSessions = sessionsByRoom
      .filter((session) => getSessionEventId(session) === eventId)
      .filter((session) => session.startTime && session.endTime)
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
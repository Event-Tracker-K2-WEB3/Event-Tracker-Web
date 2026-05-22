import { notFound } from "next/navigation";

import RoomPlanningExplorer from "@/app/components/RoomPlanningExplorer";
import { eventService } from "@/app/services/eventService";
import { getRooms } from "@/app/services/roomService";
import { getSessionsByEvent } from "@/app/services/sessionService";

interface Props {
  params: Promise<{
    eventId: string;
    roomId: string;
  }>;
}

export default async function RoomPlanningPage({ params }: Props) {
  const { eventId, roomId } = await params;

  const roomIdNumeric = Number(roomId);

  if (Number.isNaN(roomIdNumeric)) {
    notFound();
  }

  try {
    const [event, rooms, sessions] = await Promise.all([
      eventService.getEventById(eventId),
      getRooms(),
      getSessionsByEvent(eventId),
    ]);

    const activeRoom = rooms.find((room) => room.id === roomIdNumeric);

    if (!activeRoom) {
      notFound();
    }

    const roomSessions = sessions
      .filter((session) => {
        const sessionRoomId = session.room?.id ?? session.roomId;
        return sessionRoomId === roomIdNumeric;
      })
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
    console.error("Erreur chargement page Room :", error);
    notFound();
  }
}
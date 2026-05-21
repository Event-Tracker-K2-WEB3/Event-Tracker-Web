import { notFound } from "next/navigation";

import RoomPlanningExplorer from "@/app/components/RoomPlanningExplorer";
import { eventService } from "@/app/services/eventService";
import { getRooms } from "@/app/services/roomService";

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
    const [event, rooms] = await Promise.all([
      eventService.getEventById(eventId),
      getRooms(),
    ]);

    const activeRoom = rooms.find((room) => room.id === roomIdNumeric);

    if (!activeRoom) {
      notFound();
    }

    const roomSessions = (activeRoom.sessions ?? [])
      .filter((session) => session.event?.id === eventId)
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
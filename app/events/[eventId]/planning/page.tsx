import { notFound } from "next/navigation";

import GlobalPlanningExplorer from "@/app/components/GlobalPlanningExplorer";
import { eventService } from "@/app/services/eventService";
import { getRooms } from "@/app/services/roomService";
import { getSessionsByEvent } from "@/app/services/sessionService";

interface Props {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function PlanningPage({ params }: Props) {
  const { eventId } = await params;

  try {
    const [event, rooms, sessions] = await Promise.all([
      eventService.getEventById(eventId),
      getRooms(),
      getSessionsByEvent(eventId),
    ]);

    return (
      <GlobalPlanningExplorer
        event={event}
        rooms={rooms}
        sessions={sessions}
      />
    );
  } catch (error) {
    console.error("Erreur chargement planning global :", error);
    notFound();
  }
}
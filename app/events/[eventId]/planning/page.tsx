import { notFound } from "next/navigation";

import GlobalPlanningExplorer, {
  type PlanningSession,
} from "@/app/components/GlobalPlanningExplorer";
import { eventService, type EventSession } from "@/app/services/eventService";
import { getRooms } from "@/app/services/roomService";
import { getSessionById } from "@/app/services/sessionService";

interface Props {
  params: Promise<{
    eventId: string;
  }>;
}

async function enrichSession(session: EventSession): Promise<PlanningSession> {
  try {
    const details = await getSessionById(String(session.id));

    return {
      ...session,
      speakerName:
        details.speakers?.map((speaker) => speaker.name).join(", ") ||
        "Speaker to be confirmed",
      live: details.live,
    };
  } catch {
    return {
      ...session,
      speakerName: "Speaker to be confirmed",
      live: false,
    };
  }
}

export default async function PlanningPage({ params }: Props) {
  const { eventId } = await params;

  try {
    const [event, rooms, eventSessions] = await Promise.all([
      eventService.getEventById(eventId),
      getRooms(),
      eventService.getSessionsByEventId(eventId),
    ]);

    const sessions = await Promise.all(eventSessions.map(enrichSession));

    return (
      <GlobalPlanningExplorer
        event={event}
        rooms={rooms}
        sessions={sessions}
      />
    );
  } catch (error) {
    console.error("Error loading global schedule:", error);
    notFound();
  }
}
import { notFound } from "next/navigation";
import { eventService, EventSpeaker } from "@/app/services/eventService";
import { BackButton } from "./components/BackButton";
import { EventAboutSection } from "./components/EventAboutSection";
import { EventHeroSection } from "./components/EventHeroSection";
import { EventSpeakers } from "./components/EventSpeakers";
import { EventSessions } from "./components/EventSessions";


function isEventLive(startDate: string, endDate: string): boolean {
  const now = new Date();
  return new Date(startDate) <= now && new Date(endDate) >= now;
}

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  let event;
  let speakers: EventSpeaker[] = [];
  let sessions = [];

  try {
    event = await eventService.getEventById(eventId);
    speakers = await eventService.getSpeakersByEventId(eventId);
    sessions = await eventService.getSessionsByEventId(eventId);
  } catch {
    notFound();
  }

  const isLive = isEventLive(event.startDate, event.endDate);

  return (
    <main className="dark min-h-[calc(100vh-76px)] bg-event-bg">
      <div className="event-container px-12">

        <BackButton />

        <EventHeroSection
          title={event.title}
          isLive={isLive}
          startDate={event.startDate}
          endDate={event.endDate}
          location={event.location}
        />

        <EventAboutSection about={event.description} />
        <EventSpeakers speakers={speakers} />
        <EventSessions sessions={sessions} eventId={eventId} />
      </div>
    </main>
  );
}
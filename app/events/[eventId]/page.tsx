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

        <div className="animate-fade-in animation-delay-100">
          <BackButton />
        </div>

        <div className="animate-scale-in animation-delay-200">
          <EventHeroSection
            title={event.title}
            isLive={isLive}
            startDate={event.startDate}
            endDate={event.endDate}
            location={event.location}
          />
        </div>

        <div className="animate-fade-up animation-delay-300">
          <EventAboutSection about={event.description} />
        </div>

        <div className="animate-fade-up animation-delay-400">
          <EventSpeakers speakers={speakers} />
        </div>

        <div className="animate-fade-up animation-delay-400">
          <EventSessions sessions={sessions} eventId={eventId} />
        </div>

      </div>
    </main>
  );
}
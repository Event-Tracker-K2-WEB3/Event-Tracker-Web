import { notFound } from "next/navigation";
import { eventService } from "@/app/services/eventService";
import { BackButton } from "./components/BackButton";
import { EventAboutSection } from "./components/EventAboutSection";
import { EventHeroSection } from "./components/EventHeroSection";

function isEventLive(startDate: string, endDate: string): boolean {
  const now = new Date();
  return new Date(startDate) <= now && new Date(endDate) >= now;
}

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  let event;
  try {
    event = await eventService.getEventById(eventId);
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

        <EventAboutSection  about={event.description} />

      </div>
    </main>
  );
}
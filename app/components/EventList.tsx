import { EventCard } from "./EventCard";
import type { Event } from "../services/eventService";

const EventList = ({ events }: { events: Event[] }) => {
  return (
    <>
      <div className="border-2 border-red-600 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
};

export default EventList;
import { EventCard } from "./EventCard";
import type { Event } from "../services/eventService";

const FAKE_EVENT: Event = {
  id: "fake",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  location: "",
};

const EventList = ({ events }: { events: Event[] }) => {

  const MIN_CARDS = 5;
  const hasInvisibleCard = events.length < MIN_CARDS;


  return (
    <>
      <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {hasInvisibleCard && (
          <div className="invisible">
            <EventCard event={FAKE_EVENT} />
          </div>
        )}
      </div>
    </>
  );
};

export default EventList;
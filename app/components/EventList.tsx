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

  const TARGET_CARDS = 5;
  const realCount = events.length;
  const invisibleCardsNeeded = realCount > 0 ? Math.max(0, TARGET_CARDS - realCount) : 0;


  return (
    <>
      <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index}/>
        ))}
        {Array(invisibleCardsNeeded).fill(null).map((_, index) => (
          <div key={`invisible-${index}`} className="invisible">
            <EventCard event={FAKE_EVENT} />
          </div>
        ))}
      </div>
    </>
  );
};

export default EventList;
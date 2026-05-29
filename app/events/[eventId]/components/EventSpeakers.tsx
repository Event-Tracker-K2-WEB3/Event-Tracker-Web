import { UsersRound } from "lucide-react";
import Link from "next/link";

import { EventSpeaker } from "@/app/services/eventService";
import { EventSpeakerCard } from "./EventSpeakerCard";

interface EventSpeakersProps {
    speakers: EventSpeaker[];
}

export const EventSpeakers = ({ speakers }: EventSpeakersProps) => {
    if (!speakers || speakers.length === 0) {
        return null;
    }

    return (
        <section
            className="mt-5 sm:mt-6"
            aria-labelledby="event-speakers-title"
        >
            <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                    <h2
                        id="event-speakers-title"
                        className="text-lg sm:text-xl font-bold text-event-text"
                    >
                        Event Speakers
                    </h2>

                    <div className="mt-1.5 h-0.5 w-10 rounded-full bg-event-primary" />
                </div>

                <Link
                    href="/speakers"
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-event-primary/50 px-3 py-2 text-xs font-semibold text-event-primary transition hover:bg-event-primary/10 hover:text-event-primary-light"
                >
                    <UsersRound size={14} />
                    View all speakers
                </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto scroll-smooth pb-2 pr-2">
                {speakers.map((speaker) => (
                    <EventSpeakerCard key={speaker.id} speaker={speaker} />
                ))}
            </div>
        </section>
    );
};
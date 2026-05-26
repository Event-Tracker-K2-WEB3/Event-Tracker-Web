import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import { EventSpeaker } from "@/app/services/eventService";
import { EventSpeakerAvatar } from "./EventSpeakerAvatar";

interface EventSpeakerCardProps {
  speaker: EventSpeaker;
}

export const EventSpeakerCard = ({ speaker }: EventSpeakerCardProps) => {
  return (
    <Link
      href={`/speakers/${speaker.id}`}
      aria-label={`Voir le profil de ${speaker.name}`}
      className="group relative z-0 block h-[92px] w-[300px] shrink-0 rounded-xl border border-white/10 bg-[#0b1020]/72 p-3 shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition hover:z-10 hover:border-event-primary/45 hover:bg-[#11182a]/85"
    >
      <article className="flex h-full items-center gap-3">
        <EventSpeakerAvatar speaker={speaker} />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="line-clamp-1 text-sm font-bold text-event-text">
            {speaker.name}
          </h3>

          <p className="mt-1 line-clamp-1 text-xs text-event-muted">
            {speaker.role}
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-event-primary transition group-hover:text-event-primary-light">
            <ShieldCheck size={12} />
            Voir le profil
          </span>
        </div>
      </article>
    </Link>
  );
};
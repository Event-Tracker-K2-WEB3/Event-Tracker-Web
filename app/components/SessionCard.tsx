import Link from "next/link";
import { getSpeakerNames, Session } from "../data/events";

export function SessionCard({ session }: { session: Session }) {
  return (
    <Link href={`/sessions/${session.id}`} className="block rounded-2xl glass-card p-5 transition hover:-translate-y-1 hover:border-event-border-purple/70">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="rounded-xl bg-event-primary/15 px-3 py-2 text-sm font-bold text-event-accent">
          {session.start} - {session.end}
        </div>
        {session.live && (
          <span className="rounded-full bg-event-live px-3 py-1 text-xs font-black text-white">LIVE</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-event-text">{session.title}</h3>
      <p className="mt-2 text-sm leading-6 text-event-muted">{session.description}</p>
      <div className="mt-5 grid gap-2 text-sm text-event-muted sm:grid-cols-2">
        <span>⌖ {session.room}</span>
        <span>👤 {getSpeakerNames(session.speakerIds)}</span>
      </div>
    </Link>
  );
}

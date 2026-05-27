import Link from "next/link";
import type { SpeakerSession } from "@/app/services/speakerService";

function formatSessionDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatSessionTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function CalendarIcon() {
  return (
    <svg
      className="h-4 w-4 text-violet-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="h-4 w-4 text-violet-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      className="h-4 w-4 text-violet-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function SpeakerSessionRow({
  session,
}: {
  session: SpeakerSession;
}) {
  return (
    <article className="group premium-card-hover overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/80 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-[#10172a]/90 hover:shadow-[0_0_35px_rgba(124,58,237,0.18)]">
      <div className="flex flex-col gap-4 p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-900 via-indigo-900 to-fuchsia-900 md:w-44">
            {session.image ? (
              <img
                src={session.image}
                alt={session.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),transparent_55%)]">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/45">
                  Session
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-1 text-lg font-semibold text-white">
              {session.title}
            </h3>

            <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/50">
              {session.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <CalendarIcon />
                {formatSessionDate(session.startTime)}
              </span>

              <span className="inline-flex items-center gap-2">
                <ClockIcon />
                {formatSessionTime(session.startTime)} -{" "}
                {formatSessionTime(session.endTime)}
              </span>

              <span className="inline-flex items-center gap-2">
                <PinIcon />
                {session.roomName}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/sessions/${session.id}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-400/50 px-6 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-600 hover:text-white md:min-w-[160px]"
        >
          Voir la session
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}
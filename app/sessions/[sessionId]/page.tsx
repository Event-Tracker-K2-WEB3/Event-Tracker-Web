import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSessionById,
  type SessionDetails,
  type SessionSpeaker,
} from "@/app/services/sessionService";
import SessionQuestionsPanel from "@/app/components/SessionQuestionsPanel";

type SessionDetailsPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getImageSource(image?: string | null) {
  if (!image) return null;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("/")
  ) {
    return image;
  }

  return `/images/sessions/${image}.jpg`;
}

function getSpeakerPhotoSource(photo?: string | null) {
  if (!photo) return null;

  if (
    photo.startsWith("http://") ||
    photo.startsWith("https://") ||
    photo.startsWith("/")
  ) {
    return photo;
  }

  return `/images/speakers/${photo}.jpg`;
}

function CalendarIcon() {
  return (
    <svg className="h-7 w-7 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-7 w-7 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-7 w-7 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="h-7 w-7 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}


function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 border-b border-white/10 py-7 md:grid-cols-[280px_1fr] md:items-center last:border-b-0">
      <div className="flex items-center gap-5">
        {icon}
        <span className="text-xl font-semibold text-white">{label}</span>
      </div>

      <div className="text-lg leading-8 text-white/75">{value}</div>
    </div>
  );
}

function SpeakerPill({ speaker }: { speaker: SessionSpeaker }) {
  const photoSource = getSpeakerPhotoSource(speaker.photo);

  return (
    <Link
      href={`/speakers/${speaker.id}`}
      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-violet-400/50 hover:bg-violet-600/10"
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
        {photoSource ? (
          <img src={photoSource} alt={speaker.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
            {speaker.initials}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="line-clamp-1 text-sm font-semibold text-white">
          {speaker.name}
        </p>
        <p className="line-clamp-1 text-xs text-white/45">
          {speaker.role}
        </p>
      </div>
    </Link>
  );
}

export default async function SessionDetailsPage({
  params,
}: SessionDetailsPageProps) {
  const { sessionId } = await params;

  let session: SessionDetails;

  try {
    session = await getSessionById(sessionId);
  } catch {
    notFound();
  }

  const sessionImage = getImageSource(session.image);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl animate-fade-up">
          <nav className="mb-8 flex flex-wrap items-center gap-3 text-sm text-white/50">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/events" className="transition hover:text-white">Events</Link>
            <span>›</span>
            <Link href={`/events/${session.eventId}`} className="transition hover:text-white">
              {session.eventTitle}
            </Link>
            <span>›</span>
            <span className="text-white/80">{session.title}</span>
          </nav>

          <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
            <div className="premium-card-hover animate-fade-up animation-delay-100 rounded-3xl border border-white/10 bg-[#0b1020]/80 p-6 shadow-[0_0_45px_rgba(15,23,42,0.45)]">
              <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
                <div>
                  <div className="mb-8 flex flex-wrap items-center gap-4">
                    <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                            session.live
                                ? "animate-soft-pulse bg-emerald-500/15 text-emerald-300"
                                : "bg-violet-500/15 text-violet-200"
                        }`}
                    >
                    <span
                          className={`h-2 w-2 rounded-full ${
                              session.live ? "bg-emerald-400" : "bg-violet-400"
                          }`}
                      />
                                          {session.live ? "LIVE" : session.type}
                    </span>

                    <span className="text-sm text-white/65">
                      {session.live ? "Live session" : "Scheduled session"}
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                    {session.title}
                  </h1>

                  <p className="mt-7 max-w-3xl text-lg leading-9 text-white/75">
                    {session.description}
                  </p>
                </div>

                <div className="animate-scale-in animation-delay-200 h-56 overflow-hidden rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-900 via-indigo-900 to-fuchsia-900 shadow-[0_0_35px_rgba(124,58,237,0.18)]">
                  {sessionImage ? (
                    <img
                      src={sessionImage}
                      alt={session.title}
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold uppercase tracking-[0.3em] text-white/45">
                      Session
                    </div>
                  )}
                </div>
              </div>

              <div className="animate-fade-up animation-delay-300 mt-8 rounded-3xl border border-white/10 bg-white/[0.03] px-6">
                <InfoRow
                  icon={<CalendarIcon />}
                  label="Date"
                  value={formatDate(session.startTime)}
                />

                <InfoRow
                  icon={<ClockIcon />}
                  label="Time"
                  value={`${formatTime(session.startTime)} - ${formatTime(session.endTime)}`}
                />

                <InfoRow
                  icon={<PinIcon />}
                  label="Room"
                  value={session.roomName}
                />

                <InfoRow
                  icon={<FileIcon />}
                  label="Capacity"
                  value={`${session.capacity} seats`}
                />

                <InfoRow
                  icon={<FileIcon />}
                  label="Speakers"
                  value={
                    session.speakers.length > 0 ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {session.speakers.map((speaker) => (
                          <SpeakerPill key={speaker.id} speaker={speaker} />
                        ))}
                      </div>
                    ) : (
                      <span className="text-white/45">No speakers assigned.</span>
                    )
                  }
                />
              </div>
            </div>

            <SessionQuestionsPanel sessionId={session.id} live={session.live} />
          </div>
        </div>
      </section>
    </main>
  );
}
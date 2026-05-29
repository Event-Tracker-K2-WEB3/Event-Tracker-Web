import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  getSpeakerById,
  type SpeakerSession,
} from "@/app/services/speakerService";

type SpeakerDetailsPageProps = {
  params: Promise<{
    speakerId: string;
  }>;
};

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

function getSessionImageSource(image?: string | null) {
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

function formatSessionDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatSessionTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
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

function LinkedinIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href?: string | null;
  label: string;
  children: ReactNode;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-violet-400/60 hover:bg-violet-600 hover:text-white"
    >
      {children}
    </a>
  );
}

function SpeakerSessionRow({ session }: { session: SpeakerSession }) {
  const sessionImageSource = getSessionImageSource(session.image);

  return (
    <article className="group premium-card-hover overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/80 transition-all duration-300 hover:border-violet-400/50 hover:bg-[#10172a]/90">
      <div className="flex flex-col gap-4 p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-900 via-indigo-900 to-fuchsia-900 md:w-44">
            {sessionImageSource ? (
              <img
                src={sessionImageSource}
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
          View session
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}

export default async function SpeakerDetailsPage({
  params,
}: SpeakerDetailsPageProps) {
  const { speakerId } = await params;

  let speaker;

  try {
    speaker = await getSpeakerById(speakerId);
  } catch {
    notFound();
  }

  const photoSource = getSpeakerPhotoSource(speaker.photo);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden px-6 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl animate-fade-up">
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:border-violet-400/50 hover:text-violet-200"
          >
            ← Back to speakers
          </Link>

          <div className="mt-8 grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[320px_1fr] lg:items-center">
            <div className="animate-scale-in animation-delay-100 h-[340px] overflow-hidden rounded-3xl border border-violet-500/50 bg-gradient-to-br from-violet-700 via-indigo-700 to-fuchsia-700 shadow-[0_0_45px_rgba(124,58,237,0.25)]">
              {photoSource ? (
                <img
                  src={photoSource}
                  alt={speaker.name}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white">
                  {speaker.initials}
                </div>
              )}
            </div>

            <div className="animate-fade-up animation-delay-200">
              <p className="text-sm font-bold uppercase tracking-[0.45em] text-violet-300">
                Speaker
              </p>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
                {speaker.name}
              </h1>

              <p className="mt-4 text-xl text-white/75">{speaker.role}</p>

              <p className="mt-2 text-sm text-violet-200/80">
                {speaker.company} · {speaker.specialty}
              </p>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/70">
                {speaker.bio}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <SocialLink href={speaker.linkedin} label="LinkedIn">
                  <LinkedinIcon />
                </SocialLink>

                <SocialLink href={speaker.website} label="Website">
                  <GlobeIcon />
                </SocialLink>

                <SocialLink href={speaker.twitter} label="Twitter">
                  <TwitterIcon />
                </SocialLink>
              </div>
            </div>
          </div>

          <section id="sessions" className="animate-fade-up animation-delay-300 mt-9">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Sessions by this speaker
              </h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-violet-500" />
            </div>

            {speaker.sessions.length > 0 ? (
              <div className="space-y-4">
                {speaker.sessions.map((session) => (
                  <SpeakerSessionRow key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center text-white/55">
                No sessions assigned yet.
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
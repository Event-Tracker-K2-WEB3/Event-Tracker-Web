"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Speaker } from "@/app/services/speakerService";

type SpeakerCardProps = {
  speaker: Speaker;
  index: number;
};

const AVATAR_GRADIENTS = [
  "from-violet-600 to-purple-700",
  "from-blue-600 to-indigo-700",
  "from-emerald-600 to-teal-700",
  "from-red-600 to-rose-700",
  "from-orange-500 to-amber-600",
  "from-pink-600 to-fuchsia-700",
];

function getSpeakerPhotoSource(photo?: string) {
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

function getBadgeStyle(specialty: string) {
  const value = specialty.toLowerCase();

  if (value.includes("cyber")) {
    return "border-red-400/25 bg-red-500/10 text-red-300";
  }

  if (
    value.includes("devops") ||
    value.includes("web") ||
    value.includes("backend")
  ) {
    return "border-emerald-400/25 bg-emerald-500/10 text-emerald-300";
  }

  return "border-violet-400/25 bg-violet-500/10 text-violet-300";
}

function LinkedinIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
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
  href?: string;
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
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-violet-400/60 hover:bg-violet-600 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  const [imageError, setImageError] = useState(false);

  const photoSource = getSpeakerPhotoSource(speaker.photo);
  const avatarGradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  const shouldShowPhoto = photoSource && !imageError;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1220]/80 p-3 transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-[#151a2e]/90 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-[190px] gap-4">
        <div className="flex w-32 shrink-0 flex-col items-center">
          <div className="relative mt-10 h-32 w-32 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {shouldShowPhoto ? (
              <img
                src={photoSource}
                alt={speaker.name}
                onError={() => setImageError(true)}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${avatarGradient} text-3xl font-bold tracking-wider text-white`}
              >
                {speaker.initials}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <SocialLink href={speaker.linkedin} label="LinkedIn">
              <LinkedinIcon />
            </SocialLink>

            <SocialLink href={speaker.twitter} label="Twitter">
              <TwitterIcon />
            </SocialLink>

            <SocialLink href={speaker.website} label="Website">
              <GlobeIcon />
            </SocialLink>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div>
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${getBadgeStyle(
                speaker.specialty
              )}`}
            >
              {speaker.specialty}
            </span>

            <h3 className="mt-3 line-clamp-1 text-lg font-semibold leading-tight text-white">
              {speaker.name}
            </h3>

            <p className="line-clamp-1 text-sm text-violet-300">
              {speaker.role}
            </p>

            <p className="line-clamp-1 text-xs text-white/40">
              {speaker.company}
            </p>

            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">
              {speaker.bio}
            </p>
          </div>

          <div className="mt-auto pt-4">
            <div className="mb-3 flex justify-end">
              <span className="text-xs text-white/35">
                {speaker.sessionCount} session
                {speaker.sessionCount > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/speakers/${speaker.id}`}
                className="rounded-lg border border-violet-500/60 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-violet-600"
              >
                Voir le profil
              </Link>

              <Link
                href={`/speakers/${speaker.id}#sessions`}
                className="rounded-lg bg-violet-700/70 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-violet-600"
              >
                Voir les sessions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
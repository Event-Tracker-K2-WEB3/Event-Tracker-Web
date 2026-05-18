"use client";

import Link from "next/link";
import { Speaker } from "@/app/services/speakerService";

const COULEURS_SPECIALITE: Record<string, { bg: string; text: string; border: string }> = {
  IA:            { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  Cloud:         { bg: "bg-blue-500/10",   text: "text-blue-400",   border: "border-blue-500/20"   },
  Cybersécurité: { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20"    },
  Web:           { bg: "bg-emerald-500/10",text: "text-emerald-400",border: "border-emerald-500/20"},
  Mobile:        { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
};

const GRADIENTS = [
  "from-violet-600 to-purple-700",
  "from-blue-600 to-indigo-700",
  "from-emerald-600 to-teal-700",
  "from-red-600 to-rose-700",
  "from-orange-500 to-amber-600",
  "from-pink-600 to-fuchsia-700",
];

function IconSocial({ type }: { type: string }) {
  if (type === "linkedin")
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (type === "twitter")
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

export default function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  const couleur = COULEURS_SPECIALITE[speaker.specialty] ?? COULEURS_SPECIALITE["Web"];
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div className="group relative bg-[#0f0f1a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]">
      {/* Photo / Avatar */}
      <div className="p-5 pb-0">
        <div className="relative w-full aspect-square max-h-48 overflow-hidden rounded-xl">
          {speaker.photo ? (
            <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-4xl font-semibold tracking-wider`}>
              {speaker.initials}
            </div>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 pt-4">
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border mb-3 ${couleur.bg} ${couleur.text} ${couleur.border}`}>
          {speaker.specialty}
        </span>

        <h3 className="text-white font-semibold text-lg leading-tight mb-1">{speaker.name}</h3>
        <p className="text-violet-400 text-sm mb-1">{speaker.role}</p>
        <p className="text-white/40 text-xs mb-3">{speaker.company}</p>
        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{speaker.bio}</p>

        {/* Réseaux sociaux */}
        <div className="flex items-center gap-2 mb-4">
          {(["linkedin", "twitter", "website"] as const).map((type) =>
            speaker[type] ? (
              <a
                key={type}
                href={speaker[type]!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                aria-label={type}
              >
                <IconSocial type={type} />
              </a>
            ) : null
          )}
          <span className="ml-auto text-xs text-white/30">
            {speaker.sessions} session{speaker.sessions > 1 ? "s" : ""}
          </span>
        </div>

        {/* Boutons */}
        <div className="flex gap-2">
          <Link
            href={`/speakers/${speaker.id}`}
            className="flex-1 text-center text-sm font-medium py-2 px-3 rounded-lg border border-violet-500/60 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 transition-all duration-200"
          >
            Voir le profil
          </Link>
          <Link
            href={`/speakers/${speaker.id}#sessions`}
            className="flex-1 text-center text-sm font-medium py-2 px-3 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600/30 transition-all duration-200"
          >
            Voir les sessions
          </Link>
        </div>
      </div>
    </div>
  );
}
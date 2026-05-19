import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpeakerById } from "@/app/services/speakerService";

interface Props {
  params: Promise<{ speakerId: string }>;
}

const COULEURS_SPECIALITE: Record<string, { bg: string; text: string; border: string }> = {
  IA:            { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  Cloud:         { bg: "bg-blue-500/10",   text: "text-blue-400",   border: "border-blue-500/20"   },
  Cybersécurité: { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20"    },
  Web:           { bg: "bg-emerald-500/10",text: "text-emerald-400",border: "border-emerald-500/20"},
  Mobile:        { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
};


function IconSocial({ type }: { type: string }) {
  if (type === "linkedin") return <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  if (type === "twitter") return <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
  return <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}

export default async function SpeakerDetailPage({ params }: Props) {

  const { speakerId } = await params;
  const idNumeric = parseInt(speakerId);

  if (isNaN(idNumeric)) notFound();

  try {
    const speaker = await getSpeakerById(idNumeric);
    const couleur = COULEURS_SPECIALITE[speaker.specialty] ?? COULEURS_SPECIALITE["Web"];

    return (
      <div className="min-h-screen bg-[#080812] text-white">
        {/* Header simple */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080812]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center text-sm">E</span>
              <span>EventSync</span>
            </Link>
          </div>
        </header>

        {/* Bouton Retour */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Link href="/speakers" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
            ← Retour aux intervenants
          </Link>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Photo / Avatar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center text-6xl font-bold">
                {speaker.photo ? (
                  <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{speaker.initials}</span>
                )}
              </div>
            </div>

            {/* Informations du Profil */}
            <div className="flex-1">
              <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">Intervenant</span>
              <h1 className="text-5xl font-bold mt-2 mb-4">{speaker.name}</h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <p className="text-white/60 text-xl">{speaker.role} @ {speaker.company}</p>
                <span className={`text-xs px-3 py-1 rounded-full border ${couleur.bg} ${couleur.text} ${couleur.border}`}>
                  {speaker.specialty}
                </span>
              </div>

              <p className="text-white/70 leading-relaxed text-lg max-w-3xl mb-8">{speaker.bio}</p>

              {/* Réseaux Sociaux (Dynamique depuis ta base) */}
              <div className="flex items-center gap-3">
                {(["linkedin", "twitter", "website"] as const).map((social) => 
                  speaker[social] && (
                    <a key={social} href={speaker[social]!} target="_blank" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-violet-400 hover:border-violet-400/40 transition-all">
                      <IconSocial type={social} />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    notFound(); // 404 si speaker n'existe pas
  }
}
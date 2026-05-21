"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { getSpeakerById } from "@/app/services/speakerService";

interface Props {
  params: Promise<{ speakerId: string }>;
}

const COULEURS_SPECIALITE: Record<string, { bg: string; text: string; border: string }> = {
  IA:            { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  Cloud:         { bg: "bg-blue-500/10",   text: "text-blue-400",   border: "border-blue-500/20"   },
  Cybersécurité: { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20"    },
  Web:           { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  Mobile:        { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
};

function IconSocial({ type }: { type: string }) {
  if (type === "linkedin") return <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  if (type === "twitter") return <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
  return <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}

export default function SpeakerDetailPage({ params }: Props) {
  const [speaker, setSpeaker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const resolvedParams = await params;
        const idNumeric = parseInt(resolvedParams.speakerId);
        
        if (isNaN(idNumeric)) {
          notFound();
          return;
        }

        const data = await getSpeakerById(idNumeric);
        setSpeaker(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'intervenant :", error);
        notFound();
      } finally {
        setLoading(false);
        setTimeout(() => setIsMounted(true), 50);
      }
    }
    fetchData();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!speaker) return null;

  const couleur = COULEURS_SPECIALITE[speaker.specialty] ?? COULEURS_SPECIALITE["Web"];

  return (
    <div className="min-h-screen bg-[#080810] text-white font-sans antialiased pb-24 pt-24">
      
      {/* Conteneur Sticky pour le Bouton Retour */}
      <div className="sticky top-24 z-40 max-w-5xl mx-auto px-6 pointer-events-none">
        <Link 
          href="/speakers" 
          className="group pointer-events-auto inline-flex items-center gap-2 py-2 px-3 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-md text-white/40 hover:text-amber-100 transition-all duration-300 ease-out hover:-translate-x-3 shadow-xl"
        >
          <span>← Retour aux intervenants</span>
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-violet-500 via-amber-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-6 mt-6 space-y-16">
        
        {/* SECTION PROFIL INTERVENANT */}
        <section 
          className={`flex flex-col md:flex-row gap-10 items-start bg-white/[0.02] border border-white/5 p-8 rounded-3xl relative overflow-hidden transition-all duration-700 ease-out transform ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Photo / Avatar */}
          <div className="w-full md:w-52 h-52 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-[#121222] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {speaker.photo ? (
              <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-600 to-indigo-900 flex items-center justify-center text-5xl font-bold text-white/90">
                {speaker.initials || speaker.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Infos à droite */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2.5 py-1 rounded">
                Intervenant
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${couleur.bg} ${couleur.text} ${couleur.border}`}>
                {speaker.specialty}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              {speaker.name}
            </h1>

            <p className="text-lg font-medium text-white/80">
              {speaker.role} <span className="text-violet-400/80">@ {speaker.company}</span>
            </p>

            <p className="text-sm text-white/60 leading-relaxed max-w-3xl whitespace-pre-line">
              {speaker.bio || "Aucune biographie disponible pour cet intervenant."}
            </p>

            {/* Liens sociaux */}
            <div className="flex items-center gap-2.5 pt-2">
              {(["linkedin", "website", "twitter"] as const).map((social) => 
                speaker[social] && (
                  <a 
                    key={social} 
                    href={speaker[social]!} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200"
                    title={social}
                  >
                    <IconSocial type={social} />
                  </a>
                )
              )}
            </div>
          </div>
        </section>

        {/* SECTION SESSIONS AVEC CET INTERVENANT */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight border-b border-white/5 pb-3 text-white/90">
            Sessions avec cet intervenant
          </h2>

          {!speaker.sessions || speaker.sessions.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.01] border border-dashed border-white/5 rounded-2xl text-white/40 text-sm">
              Aucune session programmée pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {speaker.sessions.map((session: any, index: number) => (
                <div 
                  key={session.id}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  className={`flex flex-col bg-[#0d0d18] border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-500 group transform ${
                    isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {/* Miniature Image d'ambiance */}
                  <div className="h-40 w-full bg-gradient-to-br from-indigo-950/40 to-black relative overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-600/10 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      {session.roomName && (
                        <span className="text-[10px] font-mono bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-white/80">
                          📍 {session.roomName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contenu de la Carte */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-base text-white group-hover:text-violet-400 transition-colors duration-200 line-clamp-1">
                        {session.title}
                      </h3>
                      <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
                        {session.description || "Pas de description détaillée disponible pour cette conférence."}
                      </p>
                    </div>

                    {/* Métadonnées & Bouton d'action */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.03] text-xs">
                      <div className="text-white/40 space-y-0.5">
                        <p className="font-medium text-white/70">
                          {session.startTime ? new Date(session.startTime).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "Date à définir"}
                        </p>
                        <p className="font-mono text-[11px]">
                          {session.startTime ? new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"} 
                          {" – "}
                          {session.endTime ? new Date(session.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                        </p>
                      </div>

                      <Link 
                        href={`/sessions/${session.id}`}
                        className="bg-white/5 hover:bg-violet-600 hover:text-white border border-white/10 hover:border-violet-500 px-4 py-2 rounded-xl text-white/80 transition-all duration-200 font-medium text-xs shadow-sm"
                      >
                        Voir la session
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Speaker } from "@/app/services/speakerService";
import SpeakerCard from "./SpeakerCard";

const DOMAINES = ["Tous", "IA", "Web", "Cloud", "Cybersécurité", "Mobile"];
const JOURS = ["Tous", "Jour 1", "Jour 2", "Jour 3"];
const TYPES_SESSION = ["Tous", "Conférence", "Atelier", "Panel", "Q&A"];
const TRIS = ["Alphabétique", "Plus populaire", "Plus récent"];

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
        active
          ? "bg-violet-600 border-violet-500 text-white"
          : "bg-white/5 border-white/10 text-white/50 hover:border-violet-500/50 hover:text-white/80"
      }`}
    >
      {label}
    </button>
  );
}

interface SpeakerExplorerProps {
  speakers: Speaker[];
}

export default function SpeakerExplorer({ speakers }: SpeakerExplorerProps) {
  const [recherche, setRecherche] = useState("");
  const [domaine, setDomaine] = useState("Tous");
  const [jour, setJour] = useState("Tous");
  const [typeSession, setTypeSession] = useState("Tous");
  const [tri, setTri] = useState("Alphabétique");
  const [visible, setVisible] = useState(6);

  const filtres = useMemo(() => {
    let liste = [...speakers];

    if (recherche.trim()) {
      const q = recherche.toLowerCase();
      liste = liste.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.specialty.toLowerCase().includes(q) ||
          s.company.toLowerCase().includes(q)
      );
    }
    if (domaine !== "Tous") liste = liste.filter((s) => s.specialty === domaine);
    if (jour !== "Tous") liste = liste.filter((s) => s.day === jour);
    if (typeSession !== "Tous") liste = liste.filter((s) => s.sessionType === typeSession);

    if (tri === "Alphabétique") liste.sort((a, b) => a.name.localeCompare(b.name));
    else if (tri === "Plus populaire") liste.sort((a, b) => b.sessions - a.sessions);
    else liste.sort((a, b) => b.id - a.id);

    return liste;
  }, [speakers, recherche, domaine, jour, typeSession, tri]);

  const affiches = filtres.slice(0, visible);

  return (
    <div className="min-h-screen bg-[#080812] text-white">
      

      {/* ── HERO ── */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-block text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">
            Nos intervenants
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            Experts &amp; Conférenciers
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Rencontrez les leaders et innovateurs qui façonnent l&apos;avenir du numérique.
          </p>
          <p className="mt-4 text-violet-400 text-sm font-medium">
            {speakers.length} intervenant{speakers.length > 1 ? "s" : ""} confirmé{speakers.length > 1 ? "s" : ""}          </p>
        </div>
      </section>

      {/* ── FILTRES ── */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Recherche */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher par nom, spécialité, entreprise..."
              value={recherche}
              onChange={(e) => {
                setRecherche(e.target.value);
                setVisible(6);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm"
            />
          </div>

          {/* Domaine */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/30 text-xs uppercase tracking-wider w-16">Domaine</span>
            {DOMAINES.map((d) => (
              <FilterPill key={d} label={d} active={domaine === d} onClick={() => { setDomaine(d); setVisible(6); }} />
            ))}
          </div>

          {/* Jour + Type + Tri */}
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/30 text-xs uppercase tracking-wider w-8">Jour</span>
              {JOURS.map((j) => (
                <FilterPill key={j} label={j} active={jour === j} onClick={() => { setJour(j); setVisible(6); }} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/30 text-xs uppercase tracking-wider w-8">Type</span>
              {TYPES_SESSION.map((t) => (
                <FilterPill key={t} label={t} active={typeSession === t} onClick={() => { setTypeSession(t); setVisible(6); }} />
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-white/30 text-xs uppercase tracking-wider">Tri</span>
              <select
                value={tri}
                onChange={(e) => setTri(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              >
                {TRIS.map((t) => (
                  <option key={t} value={t} className="bg-[#0f0f1a]">{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRILLE ── */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {affiches.length === 0 ? (
            <div className="text-center py-24 text-white/30">
              <p className="text-lg">Aucun intervenant ne correspond à votre recherche.</p>
            </div>
          ) : (
            <>
              <p className="text-white/30 text-sm mb-6">
                {filtres.length} intervenant{filtres.length > 1 ? "s" : ""} trouvé{filtres.length > 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {affiches.map((speaker, i) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} index={i} />
                ))}
              </div>

              {visible < filtres.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisible((v) => v + 6)}
                    className="px-8 py-3 rounded-xl border border-violet-500/40 text-violet-400 text-sm font-medium hover:bg-violet-500/10 hover:border-violet-400 transition-all duration-200"
                  >
                    Charger plus ({filtres.length - visible} restants)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-[#06060f]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                <span className="w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center text-sm">E</span>
                <span><span className="text-white">Event</span><span className="text-violet-400">Sync</span></span>
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                La plateforme qui connecte les événements et les participants en temps réel.
              </p>
            </div>

            {[
              { titre: "Navigation", liens: ["Accueil", "Événements", "Intervenants", "À propos"] },
              { titre: "Ressources", liens: ["Programme", "FAQ", "Contact"] },
              { titre: "Légal", liens: ["Mentions légales", "Confidentialité", "Conditions d'utilisation"] },
            ].map(({ titre, liens }) => (
              <div key={titre}>
                <h4 className="text-white/60 text-xs uppercase tracking-widest mb-4">{titre}</h4>
                <ul className="space-y-2.5">
                  {liens.map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-white/40 text-sm hover:text-white transition-colors">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
            <p className="text-white/25 text-sm">© 2025 EventSync. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
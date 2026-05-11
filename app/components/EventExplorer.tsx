'use client'

import React, { useState } from "react"
import { FilterSidebar } from "./FilterSidebar"
// Supposons que tu as déjà un composant EventList ou que tu vas le créer
// import { EventList } from "./EventList" 

export const EventExplorer = () => {
  // État partagé pour les filtres (exemple pour ton équipe)
  const [filters, setFilters] = useState({
    city: "",
    date: "all",
  })

  return (
    <div className="px-12 bg-event-bg flex flex-1 flex-col lg:flex-row gap-12">
      
      {/* 1. Colonne de gauche : Sidebar (Largeur fixe sur desktop) */}
      <div className="w-full lg:w-[260px] shrink-0">
        <FilterSidebar />
      </div>

      {/* 2. Colonne de droite : Liste des événements (Prend tout l'espace restant) */}
      <main className="flex-1 space-y-8">

        {/* C'est ici que ta liste d'événements sera injectée */}
        <div className="min-h-[400px] w-full rounded-2xl border border-dashed border-event-border/30 flex items-center justify-center text-event-muted italic">
          {/* <EventList filters={filters} /> */}
          calmos fa mbola ho avy...
    
        </div>
      </main>

    </div>
  )
}
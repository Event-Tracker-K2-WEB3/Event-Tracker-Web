'use client'

import React, { useState } from "react"
import { FilterSidebar } from "./FilterSidebar"
import { Event } from "../services/eventService"
import EventList from "./EventList"


export const EventExplorer = ({events} : {events: Event[]}) => {
  // État partagé pour les filtres (exemple pour ton équipe)
  const [filters, setFilters] = useState({
    city: "",
    date: "all",
  })

  return (
    <div className="border-2 pb-4 flex-1 min-h-0 px-12 bg-event-bg flex flex-col lg:flex-row gap-4">
      
      {/* 1. Colonne de gauche : Sidebar (Largeur fixe sur desktop) */}
      <div className="w-full lg:w-[260px] shrink-0 overflow-auto">
        <FilterSidebar />
      </div>

      {/* 2. Colonne de droite : Liste des événements (Prend tout l'espace restant) */}
      <main className="flex-1 min-h-0 overflow-auto pb-8">
        <EventList events={events} />
      </main>

    </div>
  )
}

import { FilterSidebar } from "./FilterSidebar"
import { PaginatedResponse } from "../services/eventService"
import EventList from "./EventList"
import Pagination from "./Pagination"

interface EventExplorerProps {
  data: PaginatedResponse;
  currentPage: number;
}


export const EventExplorer = ({ data, currentPage }: EventExplorerProps) => {

  return (
    <div className="border-2 pb-4 flex-1 min-h-0 px-12 bg-event-bg flex flex-col lg:flex-row gap-4">

      {/* 1. Colonne de gauche : Sidebar (Largeur fixe sur desktop) */}
      <div className="w-full lg:w-[260px] shrink-0 overflow-auto">
        <FilterSidebar />
      </div>

      {/* 2. Colonne de droite : Liste des événements (Prend tout l'espace restant) */}
      <main className="flex-1 min-h-0 flex flex-col justify-center items-center overflow-auto pb-8 ">
        <EventList events={data.content} />
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          isFirstPage={data.first}
          isLastPage={data.last}
        />
      </main>

    </div>
  )
}

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
    <div className="border-2 border-orange-600 dark bg-event-bg border-2 flex-1 flex flex-col lg:flex-row  min-h-0 px-6 lg:px-12 gap-4 pb-4">

      <div className="w-full lg:w-[260px] shrink-0 overflow-auto">
        <FilterSidebar />
      </div>

      <main className="border-2 border-green-600 flex-1 min-h-0 w-full flex flex-col gap-4">

        
        <div className="border-2 flex-1 h-full">
          <EventList events={data.content} />
        </div>

        <div className="shrink-0 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            isFirstPage={data.first}
            isLastPage={data.last}
          />
        </div>

      </main>

    </div>
  )
}
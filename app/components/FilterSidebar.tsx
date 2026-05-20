import SearchBar  from "./SearchBar"
import { DateFilters } from "./DateFilters"
import { MapPin, Calendar } from "lucide-react"

export const FilterSidebar = () => {
    return (
        <aside className="dark bg-background h-full w-full flex flex-col gap-8 rounded-md overflow-hidden">

            <div className="flex flex-col gap-8 p-4 event-glass h-full border-event-border/40">

                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <Calendar className="text-event-primary" size={18} />
                        <h3 className="font-semibold text-sm tracking-wider">Date</h3>
                    </div>
                    <DateFilters/>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-event-border/50 to-transparent" />

                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <MapPin className="text-event-primary" size={18} />
                        <h3 className="font-semibold text-sm tracking-wider">Lieu</h3>
                    </div>
                    <SearchBar/>
                
                </section>

            </div>
        </aside>
    )
}

export default FilterSidebar
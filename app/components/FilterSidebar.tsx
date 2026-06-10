import { DateFilters } from "./DateFilters"
import { MapPin, Calendar } from "lucide-react"
import LocationSearch from "./LocationSearch"

export const FilterSidebar = () => {
    return (
        <aside className="dark bg-background h-full w-full flex flex-col gap-8 rounded-md overflow-hidden animate-fade-up animation-delay-300">

            <div className="flex flex-col gap-8 p-4 event-glass h-full border-event-border/40">

                <section className="space-y-4 animate-fade-up animation-delay-400">
                    <div className="flex items-center gap-2 px-1">
                        <Calendar className="text-event-primary" size={18} />
                        <h3 className="font-semibold text-sm tracking-wider">Date</h3>
                    </div>
                    <DateFilters/>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-event-border/50 to-transparent animate-fade-up animation-delay-500" />

                <section className="space-y-4 animate-fade-up animation-delay-600">
                    <div className="flex items-center gap-2 px-1">
                        <MapPin className="text-event-primary" size={18} />
                        <h3 className="font-semibold text-sm tracking-wider">Location</h3>
                    </div>
                    <LocationSearch />
                
                </section>

            </div>
        </aside>
    )
}

export default FilterSidebar
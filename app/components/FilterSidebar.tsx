import { DateFilters } from "./DateFilters"
import { MapPin, Calendar } from "lucide-react"
import LocationSearch from "./LocationSearch"

export const FilterSidebar = () => {
    return (
        <aside className="animate-scale-in animation-delay-100 dark bg-background h-full w-full flex flex-col gap-8 rounded-md overflow-hidden">

            <div className="flex flex-col gap-8 p-4 event-glass h-full border-event-border/40">

                <section className="animate-fade-up animation-delay-200 space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <Calendar className="text-event-primary" size={18} />
                        <h3 className="font-semibold text-sm tracking-wider">Date</h3>
                    </div>
                    <DateFilters/>
                </section>

                <div className="animate-fade-in animation-delay-300 h-px bg-gradient-to-r from-transparent via-event-border/50 to-transparent" />

                <section className="animate-fade-up animation-delay-400 space-y-4">
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
export const EventGridSkeleton = () => (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-xl border border-event-border bg-event-card overflow-hidden animate-pulse">
                
                <div className="h-24 bg-event-primary/20"></div>

                <div className="p-3 space-y-2">
                    <div className="h-4 bg-event-muted/20 rounded w-3/4"></div>
                    <div className="h-3 bg-event-muted/20 rounded w-full"></div>
                    <div className="h-3 bg-event-muted/20 rounded w-2/3"></div>

                    <div className="flex gap-2 pt-2">
                        <div className="h-3 bg-event-muted/20 rounded w-1/3"></div>
                        <div className="h-3 bg-event-muted/20 rounded w-1/3"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
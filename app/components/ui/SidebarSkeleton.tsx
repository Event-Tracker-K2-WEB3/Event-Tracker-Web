export const SidebarSkeleton = () => (
    <div className="p-4 space-y-6">
       
        <div className="h-4 bg-event-muted/20 rounded w-16 animate-pulse"></div>

        <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-event-muted/20 rounded-full"></div>
                    <div className="h-4 bg-event-muted/20 rounded w-24 animate-pulse"></div>
                </div>
            ))}
        </div>

        <div className="h-px bg-event-border"></div>

        <div className="h-4 bg-event-muted/20 rounded w-16 animate-pulse"></div>

        <div className="h-8 bg-event-muted/20 rounded-md w-full animate-pulse"></div>

        <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-event-muted/20 rounded"></div>
                    <div className="h-4 bg-event-muted/20 rounded w-32 animate-pulse"></div>
                    <div className="h-3 bg-event-muted/20 rounded w-6 animate-pulse ml-auto"></div>
                </div>
            ))}
        </div>
    </div>
);
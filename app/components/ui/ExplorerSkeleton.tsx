import { SidebarSkeleton } from './SidebarSkeleton';
import { EventGridSkeleton } from './EventGridSkeleton';

export const ExplorerSkeleton = () => (
    <div className="dark bg-event-bg flex-1 flex flex-col lg:flex-row min-h-0 px-6 lg:px-12 gap-4 pb-4">
        <div className="w-full lg:w-[260px] shrink-0">
            <SidebarSkeleton />
        </div>
        <main className="flex-1 min-h-0 w-full">
            <EventGridSkeleton />
        </main>
    </div>
);
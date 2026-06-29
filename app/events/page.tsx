import { Suspense } from 'react';
import { EventExplorer } from '../components/EventExplorer';
import EventFilterBlock from '../components/EventFilterBlock';
import { eventService } from '../services/eventService';
import { ExplorerSkeleton } from '../components/ui/ExplorerSkeleton';

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; date?: string; location?: string }> }) {
  const params = await searchParams;
  const searchQuery = params.q || '';

  return (
    <main className="h-auto lg:h-[calc(100vh-76px)] flex flex-col">

      <div
        className="bg-cover bg-center bg-no-repeat shrink-0 animate-scale-in animation-delay-300"
        style={{ backgroundImage: "url('/tech-summit-conference-crowd-stage-purple-hero.png')" }}
      >
        <div className="px-12 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-event-text animate-fade-up animation-delay-100">
              All events
            </h1>
            <p className="mt-2 text-event-muted animate-fade-up animation-delay-200">
              Discover all upcoming events. Conferences, workshops, summits...
            </p>
          </div>
        </div>
      </div>

      <EventFilterBlock initialSearch={searchQuery} />

      <Suspense fallback={<ExplorerSkeleton />}>
        <EventExplorerWrapper searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function EventExplorerWrapper({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; date?: string; location?: string }> }) {
  
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page) : 1;
  const searchQuery = params.q || '';
  const dateFilter = params.date || 'all';
  const locationFilter = params.location || '';

  const events = await eventService.getAllEvents(currentPage, 8, searchQuery, dateFilter, locationFilter);
  return <EventExplorer data={events} currentPage={currentPage} />;
}
import { EventExplorer } from '../components/EventExplorer';
import EventFilterBlock from '../components/EventFilterBlock';
import { eventService } from '../services/eventService';

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page) : 1;
  const searchQuery = params.q || '';
  
  const events = await eventService.getAllEvents(currentPage, 8, searchQuery);

  return (
    <main className="h-auto lg:h-[calc(100vh-76px)] flex flex-col">
  
      <div className="bg-cover bg-center bg-no-repeat shrink-0" style={{ backgroundImage: "url('/tech-summit-conference-crowd-stage-purple-hero.png')" }}>
        <div className="px-12 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-event-text">Tous les événements</h1>
            <p className="mt-2 text-event-muted">
              Découvrez tous les événements à venir. Conférences, ateliers, sommets...
            </p>
          </div>
        </div>
      </div>

      <EventFilterBlock initialSearch={searchQuery} />
      
      <EventExplorer data={events} currentPage={currentPage} />
    </main>
  );
}
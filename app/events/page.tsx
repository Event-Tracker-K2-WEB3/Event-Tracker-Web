import { eventService } from '../services/eventService';
import { EventList } from './EventList';

export default async function EventsPage() {
  const events = await eventService.getAllEvents();

  return (
    <main className="min-h-[calc(100vh-76px)]">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/tech-summit-conference-crowd-stage-purple-hero.png')" }}
      >
        <div className="event-container py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-event-text">Tous les événements</h1>
            <p className="mt-2 text-event-muted">
              Découvrez tous les événements à venir. Conférences, ateliers, sommets...
            </p>
            <p className="mt-2 text-event-muted">
              Trouvez l'expérience qui vous correspond.
            </p>
          </div>
        </div>
      </div>



    </main >
  );
}
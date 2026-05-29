import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-event-border/60 bg-event-bg/80 py-8">
      <div className="page-container flex flex-col gap-4 text-sm text-event-muted md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-event-text">EventSync</span> — your real-time event companion.
        </p>
        <div className="flex gap-5">
          <Link href="/events" className="hover:text-event-text">Events</Link>
          <Link href="/favorites" className="hover:text-event-text">Favorites</Link>
          <Link href="/sessions/ia-generative" className="hover:text-event-text">Live session</Link>
        </div>
      </div>
    </footer>
  );
}

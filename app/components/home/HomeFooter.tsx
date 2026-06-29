const footerSections = [
  { title: "Navigation", links: ["Home", "Events", "Speakers", "About"] },
  { title: "Resources", links: ["Program", "FAQ", "Contact"] },
  { title: "Legal", links: ["Legal notice", "Privacy", "Terms of use"] },
];

export default function HomeFooter() {
  return (
    <footer className="home-reveal home-delay-400 border-t border-white/5 bg-[#06060f]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <a href="/" className="mb-4 flex items-center gap-2 text-xl font-bold">
              <span className="grid size-10 place-items-center">
                <img src="/logo-event-tracker.png" alt="" />
              </span>

              <span>
                <span className="text-white">Event</span>
                <span className="text-violet-400">Sync</span>
              </span>
            </a>

            <p className="max-w-xs text-sm leading-relaxed text-white/40">
              The platform that connects events and participants in real time.
            </p>
          </div>

          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h4 className="mb-4 text-xs uppercase tracking-widest text-white/60">
                {title}
              </h4>

              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6">
          <p className="text-sm text-white/25">
            © 2026 EventSync. All rights reserved.
          </p>

          <a
            href={
              process.env.NEXT_PUBLIC_ADMIN_LOGIN_URL ||
              "http://localhost:5173/#/login"
            }
            className="inline-flex items-center rounded-xl border border-violet-500/40 px-4 py-2 text-sm font-semibold text-violet-300 transition hover:border-violet-400 hover:bg-violet-500/10 hover:text-white"
          >
            Intranet
          </a>
        </div>
      </div>
    </footer>
  );
}

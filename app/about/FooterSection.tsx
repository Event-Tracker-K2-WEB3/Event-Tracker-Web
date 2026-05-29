'use client';

import Link from 'next/link';

export default function FooterSection() {
return (
    <footer className="border-t border-white/5 bg-[#06060f]">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                        <span className="grid size-10 place-items-center">
                            <img src="/logo-event-tracker.png" alt="" />
                        </span>
                        <span><span className="text-white">Event</span><span className="text-violet-400">Sync</span></span>
                    </Link>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                        The platform that connects events and participants in real time.
                    </p>
                </div>

                {[
                    { title: "Navigation", links: ["Home", "Events", "Speakers", "About"] },
                    { title: "Resources", links: ["Program", "FAQ", "Contact"] },
                    { title: "Legal", links: ["Legal notice", "Privacy", "Terms of use"] },
                ].map(({ title, links }) => (
                    <div key={title}>
                        <h4 className="text-white/60 text-xs uppercase tracking-widest mb-4">{title}</h4>
                        <ul className="space-y-2.5">
                            {links.map((l) => (
                                <li key={l}>
                                    <Link href="#" className="text-white/40 text-sm hover:text-white transition-colors">{l}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
                <p className="text-white/25 text-sm">© 2026 EventSync. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
}
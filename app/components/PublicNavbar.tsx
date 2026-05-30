"use client";

import Link from "next/link";
import { Calendar} from "lucide-react";
import {  Heart } from "lucide-react";

import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileNavMenu from "./MobileNavMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Speakers", href: "/speakers" },
  { label: "About", href: "/about" },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-event-bg/80 backdrop-blur-xl">
      <nav className="event-container flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid size-10 place-items-center">
            <img src="/logo-event-tracker.png" alt="" />
          </span>
          <span className="text-xl font-bold tracking-tight text-event-text">
            Event<span className="text-event-primary-light">Sync</span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "relative py-7 text-sm font-medium transition",
                isActive(link.href)
                  ? "text-event-accent"
                  : "text-event-text/80 hover:text-event-text",
              ].join(" ")}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-event-primary-light" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/favorites"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-event-primary to-event-secondary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-event-primary/25 transition hover:scale-[1.02]"
          >
            <Heart size={16} />
            <span>favorites</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-xl border border-event-border bg-event-surface text-event-text lg:hidden"
          aria-label="Open mobile menu"
          aria-expanded={isOpen}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>


      </nav>

      <MobileNavMenu
        isOpen={isOpen}
        pathname={pathname}
        navLinks={navLinks}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
}

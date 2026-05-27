"use client";

import Link from "next/link";

type NavLink = {
  label: string;
  href: string;
};

type MobileNavMenuProps = {
  isOpen: boolean;
  pathname: string;
  navLinks: NavLink[];
  onClose: () => void;
};

export default function MobileNavMenu({
  isOpen,
  pathname,
  navLinks,
  onClose,
}: MobileNavMenuProps) {
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <div className="border-t border-white/10 bg-event-bg/95 px-4 pb-5 pt-3 backdrop-blur-xl lg:hidden">
      <div className="event-glass mx-auto flex max-w-xl flex-col gap-2 rounded-2xl p-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={[
              "rounded-xl px-4 py-3 text-sm font-semibold transition",
              isActive(link.href)
                ? "bg-event-primary/20 text-event-accent"
                : "text-event-text/80 hover:bg-white/5 hover:text-event-text",
            ].join(" ")}
          >
            {link.label}
          </Link>
        ))}

        <div className="my-2 h-px bg-white/10" />

        <Link
          href="/events/demo-event/planning"
          onClick={onClose}
          className="rounded-xl bg-gradient-to-r from-event-primary to-event-secondary px-4 py-3 text-center text-sm font-semibold text-white"
        >
          View program
        </Link>

        <Link
          href="/favorites"
          onClick={onClose}
          className="rounded-xl border border-event-border px-4 py-3 text-center text-sm font-semibold text-event-text"
        >
          Favorites
        </Link>
      </div>
    </div>
  );
}

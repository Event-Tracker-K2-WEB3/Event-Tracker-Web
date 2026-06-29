import type { ReactNode } from "react";

import type { HomeStats } from "./homeTypes";
import {
  CalendarStatsIcon,
  CompassIcon,
  SessionIcon,
  UserStatsIcon,
} from "./HomeIcons";

type HomeStatsSectionProps = {
  stats: HomeStats;
  activeSearch: string;
};

type StatItemProps = {
  icon: ReactNode;
  value: string;
  label: string;
  animationDelay: string;
};

export default function HomeStatsSection({
  stats,
  activeSearch,
}: HomeStatsSectionProps) {
  const statsItems = [
    {
      id: "events",
      icon: <CalendarStatsIcon />,
      value: `${stats.totalEvents}`,
      label: activeSearch ? "Results" : "Events",
    },
    {
      id: "speakers",
      icon: <UserStatsIcon />,
      value: `${stats.totalSpeakers}`,
      label: "Speakers",
    },
    {
      id: "sessions",
      icon: <SessionIcon />,
      value: `${stats.totalSessions}`,
      label: "Sessions",
    },
  ];

  return (
    <section className="bg-[#08101f] py-12">
      <div className="relative mx-auto w-full px-6 lg:px-[88px]">
        <div className="home-reveal home-delay-300 home-glow-card flex flex-col gap-8 rounded-[22px] border border-[#9b59ff]/40 bg-[linear-gradient(90deg,rgba(27,22,52,0.92),rgba(25,27,57,0.92))] px-7 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-[#2c1b68] text-[#9d5cff]">
              <CompassIcon />
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-white">
                EventSync, your event companion
              </h3>

              <p className="mt-1 max-w-[490px] text-[13px] leading-5 text-slate-300">
                Follow the program, join live sessions, and create your own
                unique experience at every event.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:min-w-[520px]">
            {statsItems.map((item, index) => (
              <StatItem
                key={item.id}
                animationDelay={`${index * 120}ms`}
                icon={item.icon}
                value={item.value}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, value, label, animationDelay }: StatItemProps) {
  return (
    <div
      style={{ animationDelay }}
      className="home-card-pop flex items-center gap-3"
    >
      <div className="flex h-[50px] w-[40px] shrink-0 items-center justify-center rounded-2xl bg-[#211944] text-[#9d5cff]">
        {icon}
      </div>

      <div>
        <p className="text-[25px] font-extrabold leading-none text-[#9957ff]">
          {value}
        </p>

        <p className="mt-1 text-[13px] text-slate-300">{label}</p>
      </div>
    </div>
  );
}

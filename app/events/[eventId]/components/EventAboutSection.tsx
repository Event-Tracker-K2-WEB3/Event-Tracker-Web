interface EventAboutSectionProps {
  about: string;
}

export const EventAboutSection = ({ about }: EventAboutSectionProps) => {
  return (
    <section className="mt-5 sm:mt-6 rounded-xl border border-white/15 bg-[#0b1020]/72 p-3 sm:p-4 md:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="space-y-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-event-text">
            À propos de l&apos;événement
          </h2>

          <div className="mt-1.5 h-0.5 w-10 rounded-full bg-event-primary" />
        </div>

        <div className="rounded-lg border border-white/15 bg-[#09101f]/78 p-3 sm:p-4">
          <p className="text-sm sm:text-[15px] leading-6 text-white/82">
            {about || "Aucune description disponible pour cet événement."}
          </p>
        </div>
      </div>
    </section>
  );
};
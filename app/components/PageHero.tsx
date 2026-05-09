export function PageHero({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-container py-14 md:py-20">
      <div className="max-w-3xl">
        <p className="section-kicker">{kicker}</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-event-text md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-event-muted md:text-lg">{description}</p>
      </div>
      {children && <div className="mt-10">{children}</div>}
    </section>
  );
}

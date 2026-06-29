type SessionPageLoaderProps = {
  title?: string;
  subtitle?: string;
};

export default function SessionPageLoader({
  title = "Loading session",
  subtitle = "Preparing session information.",
}: SessionPageLoaderProps) {
  return (
    <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#050816] px-6 text-white">
      <div className="text-center">
        <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-violet-400" />

        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-300">
          EventSync
        </p>

        <h1 className="mt-4 text-2xl font-bold md:text-3xl">
          {title}
        </h1>

        <p className="mt-3 text-sm text-white/50">
          {subtitle}
        </p>
      </div>
    </main>
  );
}
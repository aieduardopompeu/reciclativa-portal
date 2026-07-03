export function RadarAmbientalSkeleton() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-hidden>
      <div className="h-4 w-32 rounded radar-skeleton" />
      <div className="mt-3 h-6 w-64 rounded-full radar-skeleton" />
      <div className="mt-4 h-8 w-96 max-w-full rounded radar-skeleton" />

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="h-64 rounded-xl radar-skeleton" />
        <div className="flex flex-col gap-4">
          <div className="h-20 rounded-xl radar-skeleton" />
          <div className="h-20 rounded-xl radar-skeleton" />
          <div className="h-20 rounded-xl radar-skeleton" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-32 rounded-xl radar-skeleton" />
        <div className="h-32 rounded-xl radar-skeleton" />
        <div className="h-32 rounded-xl radar-skeleton" />
      </div>
    </section>
  );
}

/** Server-rendered placeholder shown until the client virtualizes the feed. */
export function FeedSkeleton() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4" aria-hidden>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-72 w-full animate-pulse rounded-2xl border border-border bg-muted/40"
        />
      ))}
    </div>
  )
}

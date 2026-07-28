function TicketStatisticCardSkeleton({
  variant = "default",
}: {
  variant?: "default" | "danger" | "warning";
}) {
  const variantClasses = {
    default: "border-zinc-200 bg-white",
    danger: "border-red-200 bg-red-50/70",
    warning: "border-amber-200 bg-amber-50/70",
  };
  const placeholderClasses = {
    default: "bg-zinc-100",
    danger: "bg-red-100",
    warning: "bg-amber-100",
  };

  return (
    <div
      className={`flex min-h-36 flex-col rounded-xl border p-5 shadow-sm ${variantClasses[variant]}`}
    >
      <span
        className={`h-3 w-28 animate-pulse rounded ${placeholderClasses[variant]}`}
      />
      <div className="mt-auto pt-6">
        <span
          className={`block h-8 w-16 animate-pulse rounded ${placeholderClasses[variant]}`}
        />
        <span
          className={`mt-2 block h-4 w-24 animate-pulse rounded ${placeholderClasses[variant]}`}
        />
      </div>
    </div>
  );
}

export default function AccountPageContentSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading your ticket statistics"
      className="border-b border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6"
      role="status"
    >
      <span className="sr-only">Loading your ticket statistics</span>

      <div aria-hidden="true">
        <span className="block h-5 w-36 animate-pulse rounded bg-zinc-200" />

        <div className="mt-4">
          <span className="block h-3 w-20 animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <TicketStatisticCardSkeleton variant="danger" />
            <TicketStatisticCardSkeleton variant="warning" />
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-5">
          <span className="block h-3 w-16 animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 5 }, (_, index) => (
              <TicketStatisticCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

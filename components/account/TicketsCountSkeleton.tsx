type TicketsCountSkeletonVariant = "default" | "danger" | "warning";

export default function TicketsCountSkeleton({
  variant = "default",
}: {
  variant?: TicketsCountSkeletonVariant;
}) {
  const placeholderClasses = {
    default: "bg-zinc-200",
    danger: "bg-red-200",
    warning: "bg-amber-200",
  };
  const placeholderClass = placeholderClasses[variant];

  return (
    <div aria-hidden="true">
      <div className="flex h-9 items-end gap-2">
        <span
          className={`h-8 w-8 animate-pulse rounded ${placeholderClass}`}
        />
        <span
          className={`mb-1 h-4 w-12 animate-pulse rounded ${placeholderClass}`}
        />
      </div>
      <span
        className={`mt-1 block h-5 w-24 animate-pulse rounded ${placeholderClass}`}
      />
    </div>
  );
}

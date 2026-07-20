export default function Spinner() {
  return (
    <div
      className="flex min-h-40 items-center justify-center"
      role="status"
      aria-label="Loading tickets"
    >
      <span className="relative flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm">
        <span className="size-4 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
      </span>
      <span className="sr-only">Loading tickets</span>
    </div>
  );
}

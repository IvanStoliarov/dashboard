export default function Label({
  label,
  popupId,
}: {
  label: string;
  popupId: string;
}) {
  return (
    <span
      id={`${popupId}-label`}
      className='block text-xs font-medium uppercase tracking-[0.08em] text-zinc-400'
    >
      {label}
    </span>
  );
}

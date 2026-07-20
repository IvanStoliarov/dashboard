export type ButtonVariant = 'primary' | 'secondary';

const baseStyles =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer';

const variantStyles = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950',
  secondary:
    'border border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100',
} satisfies Record<ButtonVariant, string>;

export function getButtonClassName(
  variant: ButtonVariant,
  className = '',
) {
  return `${baseStyles} ${variantStyles[variant]} ${className}`.trim();
}

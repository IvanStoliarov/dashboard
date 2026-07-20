import Link from 'next/link';
import {
  ButtonVariant,
  getButtonClassName,
} from '@/components/button-styles';

interface LinkAsButtonProps extends React.ComponentProps<typeof Link> {
  variant?: ButtonVariant;
}

export default function LinkAsButton({
  variant = 'primary',
  className,
  ...props
}: LinkAsButtonProps) {
  return (
    <Link
      className={getButtonClassName(variant, className)}
      {...props}
    />
  );
}

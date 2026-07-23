'use client';

import Link, { type LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type PopoverLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof LinkProps> & {
    popoverId: string;
  };

export default function PopoverLink({
  popoverId,
  onClick,
  ...props
}: PopoverLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          document.getElementById(popoverId)?.hidePopover();
        }
      }}
    />
  );
}

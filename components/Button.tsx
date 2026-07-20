import React from 'react';
import {
  ButtonVariant,
  getButtonClassName,
} from '@/components/button-styles';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  disabled: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={getButtonClassName(variant)}
    >
      {children}
    </button>
  );
}

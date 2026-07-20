import React from 'react';
import { ButtonVariant, getButtonClassName } from '@/components/button-styles';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  onClick = undefined,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${className} ${getButtonClassName(variant)}`}
    >
      {children}
    </button>
  );
}

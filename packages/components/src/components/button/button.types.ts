import * as React from 'react';
import { VariantProps } from './button';
import { buttonVariants } from './button';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a different element using Radix Slot
   */
  asChild?: boolean;

  /**
   * Custom class names for different parts of the component
   */
  classNames?: {
    root?: string;
  };

  /**
   * Show loading spinner
   */
  loading?: boolean;

  /**
   * Text to show while loading (if not provided, shows children)
   */
  loadingText?: string;

  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;

  /**
   * Make button full width
   */
  fullWidth?: boolean;

  /**
   * Border radius variant
   */
  rounded?: 'default' | 'none' | 'sm' | 'lg' | 'xl' | 'full';
}

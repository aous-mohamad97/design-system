import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Custom class names for different parts of the component
   */
  classNames?: {
    root?: string;
  };

  /**
   * Size variant
   */
  size?: 'sm' | 'default' | 'lg';

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below input
   */
  helperText?: string;

  /**
   * Label text
   */
  label?: string;

  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;

  /**
   * Make input full width
   */
  fullWidth?: boolean;

  /**
   * Additional class name for the container
   */
  containerClassName?: string;
}

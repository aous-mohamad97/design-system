/**
 * Badge component types
 */

import * as React from 'react';
import { VariantProps } from './badge';
import { badgeVariants } from './badge';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Custom class names for different parts of the component
   */
  classNames?: {
    root?: string;
  };

  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;

  /**
   * Show a dot indicator on the left
   */
  dot?: boolean;

  /**
   * Custom color for the dot (CSS color value)
   */
  dotColor?: string;

  /**
   * Border radius variant
   */
  rounded?: 'default' | 'sm' | 'md' | 'lg' | 'none' | 'full';
}

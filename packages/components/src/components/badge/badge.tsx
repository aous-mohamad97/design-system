/**
 * Advanced Badge component with icons, sizes, and extensive variants
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { BadgeProps } from './badge.types';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border',
        success: 'border-transparent bg-green-600 text-white hover:bg-green-700',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'border-transparent bg-blue-600 text-white hover:bg-blue-700',
        muted: 'border-transparent bg-muted text-muted-foreground',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-sm',
        xl: 'px-4 py-1.5 text-base',
      },
      rounded: {
        default: 'rounded-full',
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        none: 'rounded-none',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  size,
  rounded,
  classNames,
  leftIcon,
  rightIcon,
  dot,
  dotColor,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, rounded }), classNames?.root, className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'mr-1.5 h-1.5 w-1.5 rounded-full',
            dotColor || 'bg-current opacity-60',
            size === 'sm' && 'h-1 w-1 mr-1',
            size === 'lg' && 'h-2 w-2 mr-2',
            size === 'xl' && 'h-2.5 w-2.5 mr-2'
          )}
          style={dotColor ? undefined : {}}
        />
      )}
      {leftIcon && (
        <span
          className={cn(
            'inline-flex items-center',
            size === 'sm' && 'mr-1',
            size === 'default' && 'mr-1.5',
            size === 'lg' && 'mr-2',
            size === 'xl' && 'mr-2.5'
          )}
        >
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span
          className={cn(
            'inline-flex items-center',
            size === 'sm' && 'ml-1',
            size === 'default' && 'ml-1.5',
            size === 'lg' && 'ml-2',
            size === 'xl' && 'ml-2.5'
          )}
        >
          {rightIcon}
        </span>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
export type { VariantProps };

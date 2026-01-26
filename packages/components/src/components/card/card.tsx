/**
 * Advanced Card component with hover effects, clickable variant, and more styling options
 */

import * as React from 'react';
import { cn } from '../../lib/utils';
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './card.types';

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      classNames,
      hoverable = false,
      clickable = false,
      onClick,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const isInteractive = hoverable || clickable || onClick;

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200',
          variant === 'outlined' && 'border-2',
          variant === 'elevated' && 'shadow-md',
          variant === 'flat' && 'shadow-none border-0',
          hoverable && 'hover:shadow-md hover:border-primary/50 cursor-pointer',
          clickable && 'cursor-pointer active:scale-[0.98]',
          isInteractive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          classNames?.root,
          className
        )}
        onClick={onClick}
        role={clickable || onClick ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onClick) {
                  e.preventDefault();
                  onClick(e as any);
                }
              }
            : undefined
        }
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, classNames, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', classNames?.root, className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, classNames, size = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-lg',
      default: 'text-2xl',
      lg: 'text-3xl',
    };

    return (
      <h3
        ref={ref}
        className={cn(
          'font-semibold leading-none tracking-tight',
          sizeClasses[size],
          classNames?.root,
          className
        )}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, classNames, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', classNames?.root, className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, classNames, padding = 'default', ...props }, ref) => {
    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4',
      default: 'p-6 pt-0',
      lg: 'p-8 pt-0',
    };

    return (
      <div
        ref={ref}
        className={cn(paddingClasses[padding], classNames?.root, className)}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, classNames, justify = 'start', ...props }, ref) => {
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center p-6 pt-0',
          justifyClasses[justify],
          classNames?.root,
          className
        )}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

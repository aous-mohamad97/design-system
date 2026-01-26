/**
 * Advanced Input component with icons, error states, helper text, and sizes
 */

import * as React from 'react';
import { cn } from '../../lib/utils';
import type { InputProps } from './input.types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      classNames,
      size = 'default',
      error,
      helperText,
      label,
      leftIcon,
      rightIcon,
      fullWidth = true,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const sizeClasses = {
      sm: 'h-8 px-2.5 text-xs',
      default: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    };

    const iconSizeClasses = {
      sm: 'h-3.5 w-3.5',
      default: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    const inputId = React.useId();
    const helperTextId = React.useId();
    const errorId = React.useId();

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-destructive',
              size === 'sm' && 'text-xs',
              size === 'lg' && 'text-base'
            )}
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                'absolute left-0 top-0 flex h-full items-center text-muted-foreground',
                size === 'sm' && 'pl-2.5',
                size === 'default' && 'pl-3',
                size === 'lg' && 'pl-4'
              )}
            >
              <span className={cn('inline-flex', iconSizeClasses[size])}>{leftIcon}</span>
            </div>
          )}
          <input
            id={inputId}
            type={inputType}
            className={cn(
              'flex w-full rounded-md border bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
              sizeClasses[size],
              leftIcon &&
                (size === 'sm'
                  ? 'pl-8'
                  : size === 'default'
                    ? 'pl-10'
                    : 'pl-12'),
              (rightIcon || isPassword) &&
                (size === 'sm'
                  ? 'pr-8'
                  : size === 'default'
                    ? 'pr-10'
                    : 'pr-12'),
              error
                ? 'border-destructive focus-visible:ring-destructive'
                : 'border-input',
              classNames?.root,
              className
            )}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperText ? helperTextId : undefined}
            {...props}
          />
          {(rightIcon || isPassword) && (
            <div
              className={cn(
                'absolute right-0 top-0 flex h-full items-center',
                size === 'sm' && 'pr-2.5',
                size === 'default' && 'pr-3',
                size === 'lg' && 'pr-4'
              )}
            >
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    'text-muted-foreground hover:text-foreground transition-colors',
                    iconSizeClasses[size]
                  )}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-full h-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-full h-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              ) : (
                <span className={cn('inline-flex text-muted-foreground', iconSizeClasses[size])}>
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div
            id={error ? errorId : helperTextId}
            className={cn(
              'text-xs',
              error ? 'text-destructive' : 'text-muted-foreground',
              size === 'sm' && 'text-[10px]',
              size === 'lg' && 'text-sm'
            )}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };

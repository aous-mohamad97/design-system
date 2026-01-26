import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom class names for different parts of the component
   */
  classNames?: {
    root?: string;
  };

  /**
   * Enable hover effects
   */
  hoverable?: boolean;

  /**
   * Make card clickable (adds cursor and active state)
   */
  clickable?: boolean;

  /**
   * Card variant style
   */
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: {
    root?: string;
  };
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  classNames?: {
    root?: string;
  };

  /**
   * Title size
   */
  size?: 'sm' | 'default' | 'lg';
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  classNames?: {
    root?: string;
  };
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: {
    root?: string;
  };

  /**
   * Padding variant
   */
  padding?: 'none' | 'sm' | 'default' | 'lg';
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: {
    root?: string;
  };

  /**
   * Justify content alignment
   */
  justify?: 'start' | 'center' | 'end' | 'between';
}

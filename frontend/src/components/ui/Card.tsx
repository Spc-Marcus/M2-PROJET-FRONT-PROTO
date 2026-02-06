import React from 'react';

/**
 * Card component props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card header content */
  header?: React.ReactNode;
  /** Card body content */
  children: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Padding size variant */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Enable hover effect */
  hoverable?: boolean;
}

/**
 * Card container component with optional header, body, and footer
 * 
 * @example
 * ```tsx
 * <Card header="Title" footer={<Button>Action</Button>}>
 *   Card content here
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      header,
      children,
      footer,
      padding = 'md',
      hoverable = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm';
    
    const hoverStyles = hoverable
      ? 'transition-shadow duration-200 hover:shadow-md'
      : '';

    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${className}`}
        {...props}
      >
        {header && (
          <div className={`border-b border-gray-200 dark:border-gray-700 ${padding !== 'none' ? paddingStyles[padding] : 'p-4'} pb-3`}>
            {typeof header === 'string' ? (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {header}
              </h3>
            ) : (
              header
            )}
          </div>
        )}
        <div className={padding !== 'none' ? paddingStyles[padding] : ''}>
          {children}
        </div>
        {footer && (
          <div className={`border-t border-gray-200 dark:border-gray-700 ${padding !== 'none' ? paddingStyles[padding] : 'p-4'} pt-3`}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

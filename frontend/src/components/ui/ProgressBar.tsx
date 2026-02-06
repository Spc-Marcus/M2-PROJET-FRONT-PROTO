import React from 'react';

/**
 * ProgressBar component props
 */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Color variant */
  variant?: 'blue' | 'green' | 'red' | 'yellow' | 'sky';
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'outside';
  /** Enable animation */
  animated?: boolean;
  /** Height size */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Progress bar component with customizable variants
 * 
 * @example
 * ```tsx
 * <ProgressBar 
 *   value={75} 
 *   variant="sky" 
 *   showLabel 
 *   animated 
 * />
 * ```
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      variant = 'sky',
      showLabel = false,
      labelPosition = 'inside',
      animated = false,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variantStyles = {
      blue: 'bg-blue-500 dark:bg-blue-600',
      green: 'bg-green-500 dark:bg-green-600',
      red: 'bg-red-500 dark:bg-red-600',
      yellow: 'bg-yellow-500 dark:bg-yellow-600',
      sky: 'bg-sky-500 dark:bg-sky-600',
    };

    const sizeStyles = {
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6',
    };

    const animationStyles = animated ? 'transition-all duration-300 ease-in-out' : '';

    return (
      <div ref={ref} className={className} {...props}>
        {showLabel && labelPosition === 'outside' && (
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div
          className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeStyles[size]}`}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={`${variantStyles[variant]} ${sizeStyles[size]} ${animationStyles} rounded-full flex items-center justify-center`}
            style={{ width: `${percentage}%` }}
          >
            {showLabel && labelPosition === 'inside' && size !== 'sm' && (
              <span className="text-xs font-medium text-white px-2">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

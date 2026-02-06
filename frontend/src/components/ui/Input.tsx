import React from 'react';

/**
 * Input component props
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Icon element to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon element to display on the right */
  rightIcon?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
}

/**
 * Input component with label, error, and icon support
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Email" 
 *   type="email" 
 *   error="Invalid email"
 *   placeholder="Enter your email"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseStyles = 'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800';
    
    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400'
      : 'border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:focus:border-sky-400';
    
    const paddingStyles = leftIcon && rightIcon
      ? 'pl-10 pr-10 py-2'
      : leftIcon
      ? 'pl-10 pr-4 py-2'
      : rightIcon
      ? 'pl-4 pr-10 py-2'
      : 'px-4 py-2';

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <div className={widthStyle}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`${baseStyles} ${stateStyles} ${paddingStyles} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

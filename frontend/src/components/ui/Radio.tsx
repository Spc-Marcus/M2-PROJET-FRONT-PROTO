import React from 'react';

/**
 * Radio button props
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
}

/**
 * Radio button component
 * 
 * @example
 * ```tsx
 * <Radio 
 *   name="option"
 *   value="a"
 *   label="Option A" 
 *   checked={value === 'a'}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      error,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={className}>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              id={radioId}
              type="radio"
              disabled={disabled}
              className={`w-4 h-4 text-sky-500 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 ${
                error ? 'border-red-500 dark:border-red-400' : ''
              }`}
              {...props}
            />
          </div>
          {label && (
            <label
              htmlFor={radioId}
              className={`ml-2 text-sm font-medium ${
                disabled
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 cursor-pointer'
              }`}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

import React from 'react';

/**
 * Checkbox component props
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Error message */
  error?: string;
}

/**
 * Checkbox input component
 * 
 * @example
 * ```tsx
 * <Checkbox 
 *   label="Accept terms" 
 *   checked={checked}
 *   onChange={(e) => setChecked(e.target.checked)}
 * />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      error,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const checkboxRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => checkboxRef.current!);

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={className}>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={checkboxRef}
              id={checkboxId}
              type="checkbox"
              disabled={disabled}
              className={`w-4 h-4 text-sky-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 ${
                error ? 'border-red-500 dark:border-red-400' : ''
              }`}
              {...props}
            />
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
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

Checkbox.displayName = 'Checkbox';

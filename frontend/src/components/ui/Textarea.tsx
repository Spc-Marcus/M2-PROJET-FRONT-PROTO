import React, { useEffect, useRef } from 'react';

/**
 * Textarea component props
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Auto-resize height */
  autoResize?: boolean;
  /** Show character counter */
  showCounter?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Textarea input component with auto-resize and character counter
 * 
 * @example
 * ```tsx
 * <Textarea 
 *   label="Description" 
 *   autoResize
 *   showCounter
 *   maxLength={500}
 * />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      autoResize = false,
      showCounter = false,
      fullWidth = false,
      disabled,
      className = '',
      id,
      maxLength,
      value = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const element = textareaRef.current;
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
      }
    }, [value, autoResize, textareaRef]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      onChange?.(e);
    };

    const baseStyles = 'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800';
    
    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400'
      : 'border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:focus:border-sky-400';

    const widthStyle = fullWidth ? 'w-full' : '';
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={widthStyle}>
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <label
              htmlFor={textareaId}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {label}
            </label>
          )}
          {showCounter && maxLength && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          ref={textareaRef}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={`${baseStyles} ${stateStyles} px-4 py-2 ${className}`}
          {...props}
        />
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

Textarea.displayName = 'Textarea';

import React from 'react';

/**
 * Loader component props
 */
export interface LoaderProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?: 'primary' | 'white' | 'gray';
  /** Show as full page overlay */
  overlay?: boolean;
  /** Loading text */
  text?: string;
}

/**
 * Loading spinner component with optional overlay
 * 
 * @example
 * ```tsx
 * <Loader size="lg" variant="primary" text="Loading..." />
 * <Loader overlay text="Please wait..." />
 * ```
 */
export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'primary',
  overlay = false,
  text,
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const variantStyles = {
    primary: 'text-sky-500',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <svg
        className={`animate-spin ${sizeStyles[size]} ${variantStyles[variant]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className={`text-sm font-medium ${overlay ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

Loader.displayName = 'Loader';

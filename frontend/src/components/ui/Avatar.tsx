import React, { useState } from 'react';

/**
 * Avatar component props
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (initials) */
  fallback?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy' | null;
  /** Shape variant */
  shape?: 'circle' | 'square';
}

/**
 * Avatar component with image fallback and status indicator
 * 
 * @example
 * ```tsx
 * <Avatar 
 *   src="/user.jpg" 
 *   alt="John Doe"
 *   fallback="JD"
 *   status="online"
 *   size="md"
 * />
 * ```
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback = '',
      size = 'md',
      status = null,
      shape = 'circle',
      className = '',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const sizeStyles = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-xl',
    };

    const shapeStyles = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
    };

    const statusSizes = {
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
    };

    const showFallback = !src || imageError;

    return (
      <div ref={ref} className={`relative inline-block ${className}`} {...props}>
        <div
          className={`${sizeStyles[size]} ${shapeStyles} bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 flex items-center justify-center font-semibold overflow-hidden`}
        >
          {showFallback ? (
            <span>{fallback}</span>
          ) : (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        {status && (
          <span
            className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} border-2 border-white dark:border-gray-800 rounded-full`}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

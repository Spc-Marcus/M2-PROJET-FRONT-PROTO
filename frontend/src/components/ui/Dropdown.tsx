import React, { useState, useRef, useEffect } from 'react';

/**
 * Dropdown menu item
 */
export interface DropdownItem {
  /** Item label */
  label: string;
  /** Item value/key */
  value: string;
  /** Item icon */
  icon?: React.ReactNode;
  /** Is divider */
  divider?: boolean;
  /** Is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Dropdown component props
 */
export interface DropdownProps {
  /** Trigger button content */
  trigger: React.ReactNode;
  /** Dropdown menu items */
  items: DropdownItem[];
  /** Alignment of dropdown */
  align?: 'left' | 'right';
  /** Custom trigger button class */
  triggerClassName?: string;
}

/**
 * Dropdown menu component with keyboard navigation
 * 
 * @example
 * ```tsx
 * <Dropdown 
 *   trigger="Menu"
 *   items={[
 *     { label: 'Edit', value: 'edit', onClick: () => {} },
 *     { label: 'Delete', value: 'delete', onClick: () => {} }
 *   ]}
 * />
 * ```
 */
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'left',
  triggerClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const enabledItems = items.filter(item => !item.divider && !item.disabled);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => (prev + 1) % enabledItems.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => (prev - 1 + enabledItems.length) % enabledItems.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0) {
            enabledItems[focusedIndex]?.onClick?.();
            setIsOpen(false);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, items]);

  const alignmentStyles = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={triggerClassName || 'px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`absolute ${alignmentStyles} mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50`}
          role="menu"
        >
          <div className="py-1">
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${index}`}
                    className="my-1 border-t border-gray-200 dark:border-gray-700"
                  />
                );
              }

              const enabledItems = items.filter(i => !i.divider && !i.disabled);
              const enabledIndex = enabledItems.findIndex(i => i.value === item.value);
              const isFocused = enabledIndex === focusedIndex;

              return (
                <button
                  key={item.value}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick?.();
                      setIsOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                    item.disabled
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : isFocused
                      ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  role="menuitem"
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

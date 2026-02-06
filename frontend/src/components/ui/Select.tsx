import React, { useState, useRef, useEffect } from 'react';

/**
 * Select option
 */
export interface SelectOption {
  /** Option label */
  label: string;
  /** Option value */
  value: string;
  /** Is disabled */
  disabled?: boolean;
}

/**
 * Select component props
 */
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Options array */
  options: SelectOption[];
  /** Selected value(s) */
  value?: string | string[];
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Enable search/filter */
  searchable?: boolean;
  /** Enable multi-select */
  multiple?: boolean;
  /** Error message */
  error?: string;
  /** Is disabled */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Select dropdown component with search and multi-select support
 * 
 * @example
 * ```tsx
 * <Select 
 *   label="Country"
 *   options={[{ label: 'USA', value: 'us' }]}
 *   value="us"
 *   onChange={(val) => setValue(val)}
 * />
 * ```
 */
export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select...',
  options,
  value,
  onChange,
  searchable = false,
  multiple = false,
  error,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOptions = multiple
    ? options.filter(opt => (value as string[])?.includes(opt.value))
    : options.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = (value as string[]) || [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const displayText = multiple
    ? (selectedOptions as SelectOption[]).length > 0
      ? (selectedOptions as SelectOption[]).map(o => o.label).join(', ')
      : placeholder
    : (selectedOptions as SelectOption)?.label || placeholder;

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div ref={selectRef} className={`${widthStyle} ${className}`} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full text-left px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={selectedOptions ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}>
              {displayText}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
            {searchable && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No options found
                </div>
              ) : (
                filteredOptions.map(option => {
                  const isSelected = multiple
                    ? (value as string[])?.includes(option.value)
                    : value === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        option.disabled
                          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : isSelected
                          ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {multiple && (
                          <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                            isSelected
                              ? 'bg-sky-500 border-sky-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        )}
                        <span>{option.label}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

Select.displayName = 'Select';

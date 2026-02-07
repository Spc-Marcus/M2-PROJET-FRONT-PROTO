import React, { useState } from 'react';

/**
 * Tab item
 */
export interface TabItem {
  /** Tab key/id */
  key: string;
  /** Tab label */
  label: string;
  /** Tab icon */
  icon?: React.ReactNode;
  /** Tab content */
  content: React.ReactNode;
  /** Is disabled */
  disabled?: boolean;
}

/**
 * Tabs component props
 */
export interface TabsProps {
  /** Tab items */
  items: TabItem[];
  /** Default active tab key */
  defaultActiveKey?: string;
  /** Controlled active tab key */
  activeKey?: string;
  /** Callback when tab changes */
  onChange?: (key: string) => void;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Tab navigation component
 * 
 * @example
 * ```tsx
 * <Tabs 
 *   items={[
 *     { key: '1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { key: '2', label: 'Tab 2', content: <div>Content 2</div> }
 *   ]}
 * />
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  orientation = 'horizontal',
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || items[0]?.key
  );

  const activeKey = controlledActiveKey ?? internalActiveKey;

  const handleTabClick = (key: string) => {
    if (controlledActiveKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

  const activeTab = items.find(item => item.key === activeKey);

  if (orientation === 'vertical') {
    return (
      <div className="flex gap-4">
        <div className="flex flex-col gap-1 min-w-[200px]" role="tablist" aria-orientation="vertical">
          {items.map(item => (
            <button
              key={item.key}
              onClick={() => !item.disabled && handleTabClick(item.key)}
              disabled={item.disabled}
              role="tab"
              aria-selected={item.key === activeKey}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                item.key === activeKey
                  ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
                  : item.disabled
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex-1" role="tabpanel">
          {activeTab?.content}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700" role="tablist">
        <div className="flex gap-1 -mb-px">
          {items.map(item => (
            <button
              key={item.key}
              onClick={() => !item.disabled && handleTabClick(item.key)}
              disabled={item.disabled}
              role="tab"
              aria-selected={item.key === activeKey}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                item.key === activeKey
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : item.disabled
                  ? 'border-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-4" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

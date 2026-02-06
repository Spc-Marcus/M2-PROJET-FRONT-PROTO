import React, { useState } from 'react';

/**
 * Table column definition
 */
export interface TableColumn<T = any> {
  /** Column key */
  key: string;
  /** Column header label */
  label: string;
  /** Render function for cell content */
  render?: (value: any, row: T, index: number) => React.ReactNode;
  /** Is sortable */
  sortable?: boolean;
  /** Column width */
  width?: string;
}

/**
 * Table component props
 */
export interface TableProps<T = any> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Data array */
  data: T[];
  /** Row key extractor */
  rowKey?: (row: T, index: number) => string | number;
  /** Enable row selection */
  selectable?: boolean;
  /** Selected row keys */
  selectedRows?: (string | number)[];
  /** Selection change handler */
  onSelectionChange?: (selectedKeys: (string | number)[]) => void;
  /** Sort change handler */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  /** Empty state message */
  emptyMessage?: string;
}

/**
 * Table component with sorting and selection
 * 
 * @example
 * ```tsx
 * <Table 
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'email', label: 'Email' }
 *   ]}
 *   data={users}
 * />
 * ```
 */
export function Table<T = any>({
  columns,
  data,
  rowKey = (_, index) => index,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  onSort,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(newDirection);
    onSort?.(key, newDirection);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      onSelectionChange?.([]);
    } else {
      const allKeys = data.map((row, index) => rowKey(row, index));
      onSelectionChange?.(allKeys);
    }
  };

  const handleSelectRow = (key: string | number) => {
    const newSelection = selectedRows.includes(key)
      ? selectedRows.filter(k => k !== key)
      : [...selectedRows, key];
    onSelectionChange?.(newSelection);
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) {
                      el.indeterminate = someSelected;
                    }
                  }}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-sky-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-sky-500"
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {column.label}
                    {sortKey === column.key && (
                      <svg
                        className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const key = rowKey(row, index);
              const isSelected = selectedRows.includes(key);

              return (
                <tr
                  key={key}
                  className={`${isSelected ? 'bg-sky-50 dark:bg-sky-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800'} transition-colors`}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(key)}
                        className="w-4 h-4 text-sky-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-sky-500"
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                    >
                      {column.render
                        ? column.render((row as any)[column.key], row, index)
                        : (row as any)[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = 'Table';

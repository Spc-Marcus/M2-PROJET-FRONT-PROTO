import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ items, isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 transition-transform duration-300 ease-in-out overflow-y-auto',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="p-4 space-y-1">
          {items.map((item) => {
            const isActive = isActivePath(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                <span className={cn(
                  'w-5 h-5 flex-shrink-0',
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                )}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

import { useAuthStore } from '../../stores/authStore';
import { Dropdown } from '../ui/Dropdown';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuToggle?: boolean;
}

export const Header = ({ onMenuToggle, showMenuToggle = true }: HeaderProps) => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  const userMenuItems = [
    {
      label: 'Profile',
      value: 'profile',
      onClick: () => {
        window.location.href = '/profile';
      },
    },
    {
      label: 'Settings',
      value: 'settings',
      onClick: () => {
        window.location.href = '/settings';
      },
    },
    {
      label: 'Logout',
      value: 'logout',
      onClick: handleLogout,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left section: Menu toggle and logo */}
        <div className="flex items-center gap-4">
          {showMenuToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          )}
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              Duobingo
            </h1>
          </div>
        </div>

        {/* Right section: User menu */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {user.email}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user.role.toLowerCase()}
              </span>
            </div>
            
            <Dropdown
              trigger={
                <Avatar
                  fallback={getUserInitials()}
                  size="md"
                  className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                />
              }
              items={userMenuItems}
              align="right"
              triggerClassName=""
            />
          </div>
        )}
      </div>
    </header>
  );
};

import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Sidebar, Footer, Breadcrumbs } from '../components/layout';
import type { SidebarItem, BreadcrumbItem } from '../components/layout';
import { HomeIcon, BookIcon, TrophyIcon, ChartIcon, UserIcon } from '../components/layout/icons';

const studentNavItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    path: '/student/dashboard',
    icon: <HomeIcon />,
  },
  {
    label: 'My Courses',
    path: '/student/courses',
    icon: <BookIcon />,
  },
  {
    label: 'Leaderboards',
    path: '/student/leaderboards',
    icon: <TrophyIcon />,
  },
  {
    label: 'Statistics',
    path: '/student/statistics',
    icon: <ChartIcon />,
  },
  {
    label: 'Profile',
    path: '/student/profile',
    icon: <UserIcon />,
  },
];

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  segments.forEach((segment, index) => {
    if (index === 0) return; // Skip 'student'
    
    const path = '/' + segments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    breadcrumbs.push({
      label,
      path: index === segments.length - 1 ? undefined : path,
    });
  });

  return breadcrumbs;
};

export const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        showMenuToggle={true}
      />
      
      <div className="flex flex-1">
        <Sidebar
          items={studentNavItems}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {breadcrumbs.length > 0 && (
              <Breadcrumbs items={breadcrumbs} className="mb-4" />
            )}
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

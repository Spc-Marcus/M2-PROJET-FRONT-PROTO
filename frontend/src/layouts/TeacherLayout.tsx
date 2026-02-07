import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Sidebar, Footer, Breadcrumbs } from '../components/layout';
import type { SidebarItem, BreadcrumbItem } from '../components/layout';
import { HomeIcon, AcademicCapIcon, PlusIcon, ChartIcon, UserIcon } from '../components/layout/icons';

const teacherNavItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    path: '/teacher/dashboard',
    icon: <HomeIcon />,
  },
  {
    label: 'My Classrooms',
    path: '/teacher/classrooms',
    icon: <AcademicCapIcon />,
  },
  {
    label: 'Create Classroom',
    path: '/teacher/classrooms/create',
    icon: <PlusIcon />,
  },
  {
    label: 'Statistics',
    path: '/teacher/statistics',
    icon: <ChartIcon />,
  },
  {
    label: 'Profile',
    path: '/teacher/profile',
    icon: <UserIcon />,
  },
];

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  segments.forEach((segment, index) => {
    if (index === 0) return; // Skip 'teacher'
    
    const path = '/' + segments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    breadcrumbs.push({
      label,
      path: index === segments.length - 1 ? undefined : path,
    });
  });

  return breadcrumbs;
};

export const TeacherLayout = () => {
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
          items={teacherNavItems}
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

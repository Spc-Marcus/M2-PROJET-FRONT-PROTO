import { useAuthStore } from '../../stores/authStore';
import { Card } from '../../components/ui/Card';

export const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.email}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
            <p className="text-xs text-gray-500 mt-1">System-wide</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Teachers</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-xs text-gray-500 mt-1">Active teachers</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Students</h3>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-xs text-gray-500 mt-1">Active students</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Classrooms</h3>
            <p className="text-3xl font-bold text-orange-600">0</p>
            <p className="text-xs text-gray-500 mt-1">Total classrooms</p>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">System Overview</h2>
            <div className="text-center py-12 text-gray-500">
              <p>System metrics will be displayed here</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

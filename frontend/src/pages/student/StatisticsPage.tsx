import { Card } from '../../components/ui/Card';

export const StatisticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Statistics</h1>
          <p className="text-gray-600 mt-2">Track your learning progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Points</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Quizzes Completed</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Success Rate</h3>
            <p className="text-3xl font-bold text-purple-600">0%</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Over Time</h2>
          <div className="text-center py-12 text-gray-500">
            <p>No statistics data available</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

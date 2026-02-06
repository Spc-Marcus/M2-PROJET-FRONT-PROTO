import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const QuizManagementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Management</h1>
            <p className="text-gray-600 mt-2">Create and manage quizzes</p>
          </div>
          <Button>Create Quiz</Button>
        </div>

        <Card className="p-6">
          <div className="text-center py-12 text-gray-500">
            <p>No quizzes created yet</p>
            <p className="text-sm mt-2">Create your first quiz to get started</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

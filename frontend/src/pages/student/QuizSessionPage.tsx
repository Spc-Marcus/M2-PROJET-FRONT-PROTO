import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

export const QuizSessionPage = () => {
  const { quizId } = useParams<{ quizId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Quiz Session</h1>
          <p className="text-gray-600 mb-4">Quiz ID: {quizId}</p>
          
          <div className="text-center py-12 text-gray-500">
            <p>Quiz session functionality will be implemented here</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

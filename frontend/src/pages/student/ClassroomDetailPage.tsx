import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

export const ClassroomDetailPage = () => {
  const { classroomId } = useParams<{ classroomId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Classroom Details</h1>
          <p className="text-gray-600 mt-2">Classroom ID: {classroomId}</p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Modules</h2>
          <div className="text-center py-12 text-gray-500">
            <p>No modules available</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

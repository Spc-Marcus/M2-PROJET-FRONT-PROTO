import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const ClassroomDetailPage = () => {
  const { classroomId } = useParams<{ classroomId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Classroom Management</h1>
            <p className="text-gray-600 mt-2">Classroom ID: {classroomId}</p>
          </div>
          <Button>Edit Classroom</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Students</h2>
            <div className="text-center py-8 text-gray-500">
              <p>No students enrolled</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Modules</h2>
            <div className="text-center py-8 text-gray-500">
              <p>No modules assigned</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

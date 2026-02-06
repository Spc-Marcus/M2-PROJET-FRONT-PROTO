import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const CreateClassroomPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Classroom</h1>
          <p className="text-gray-600 mt-2">Set up a new classroom for your students</p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="text-center py-12 text-gray-500">
              <p>Classroom creation form will be implemented here</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => navigate('/teacher/classrooms')}>
                Cancel
              </Button>
              <Button>Create Classroom</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

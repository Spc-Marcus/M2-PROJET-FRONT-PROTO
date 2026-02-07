import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const UsersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage all system users</p>
          </div>
          <Button onClick={() => navigate('/admin/users/create')}>
            Create User
          </Button>
        </div>

        <Card className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">All Users</h2>
          </div>
          <div className="text-center py-12 text-gray-500">
            <p>No users found</p>
            <p className="text-sm mt-2">Create your first user to get started</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

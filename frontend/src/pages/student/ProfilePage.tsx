import { useAuthStore } from '../../stores/authStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings</p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-gray-900">{user?.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <p className="mt-1 text-gray-900">{user?.studentProfile?.level || 'N/A'}</p>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="secondary">Edit Profile</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

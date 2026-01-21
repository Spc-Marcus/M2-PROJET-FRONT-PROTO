import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { ClassroomDto, Level } from '../types';

export const TeacherDashboard = () => {
  const [classrooms, setClassrooms] = useState<ClassroomDto[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClassroom, setNewClassroom] = useState({ name: '', level: 'L1' as Level });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = async () => {
    try {
      const data = await apiService.getClassrooms();
      setClassrooms(data);
    } catch (error) {
      console.error('Failed to load classrooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createClassroom(newClassroom);
      setShowCreateForm(false);
      setNewClassroom({ name: '', level: 'L1' });
      loadClassrooms();
    } catch (error) {
      console.error('Failed to create classroom:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Teacher Dashboard</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          {showCreateForm ? 'Cancel' : 'Create Classroom'}
        </button>
      </div>

      {showCreateForm && (
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Create New Classroom</h2>
          <form onSubmit={handleCreateClassroom}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
              <input
                type="text"
                value={newClassroom.name}
                onChange={(e) => setNewClassroom({ ...newClassroom, name: e.target.value })}
                required
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Level:</label>
              <select
                value={newClassroom.level}
                onChange={(e) => setNewClassroom({ ...newClassroom, level: e.target.value as Level })}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
              </select>
            </div>
            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Create
            </button>
          </form>
        </div>
      )}

      <h2>My Classrooms</h2>
      {classrooms.length === 0 ? (
        <p>You haven't created any classrooms yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {classrooms.map((classroom) => (
            <div
              key={classroom.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              onClick={() => window.location.href = `/teacher/classroom/${classroom.id}`}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <h3>{classroom.name}</h3>
              <p>Level: {classroom.level}</p>
              <p>Students: {classroom.studentCount}</p>
              <p>Access Code: <strong>{classroom.code}</strong></p>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                Teachers: {classroom.otherTeachers.length + 1}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { ClassroomDto } from '../types';

export const StudentDashboard = () => {
  const [classrooms, setClassrooms] = useState<ClassroomDto[]>([]);
  const [joinCode, setJoinCode] = useState('');
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

  const handleJoinClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For join, we need to find the classroom by code first or use a different approach
      // Since API requires classroom ID, this is simplified
      alert('Join functionality requires classroom ID. Please use classroom detail page.');
      setJoinCode('');
    } catch (error) {
      console.error('Failed to join classroom:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Student Dashboard</h1>
      
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Join a Classroom</h2>
        <form onSubmit={handleJoinClassroom} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Enter classroom code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            style={{ flex: 1, padding: '8px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '8px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Join
          </button>
        </form>
      </div>

      <h2>My Classrooms</h2>
      {classrooms.length === 0 ? (
        <p>You are not enrolled in any classrooms yet.</p>
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
              onClick={() => window.location.href = `/classroom/${classroom.id}`}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <h3>{classroom.name}</h3>
              <p>Level: {classroom.level}</p>
              <p>Students: {classroom.studentCount}</p>
              <p>Code: {classroom.code}</p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Teacher: {classroom.responsibleProfessor.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

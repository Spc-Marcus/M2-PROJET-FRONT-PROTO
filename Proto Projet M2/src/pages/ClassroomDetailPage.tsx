import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import type { ClassroomDto, ModuleDto, QuizDto } from '../types';

export const ClassroomDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [classroom, setClassroom] = useState<ClassroomDto | null>(null);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [quizzes, setQuizzes] = useState<QuizDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  useEffect(() => {
    if (selectedModule) {
      loadQuizzes(selectedModule);
    }
  }, [selectedModule]);

  const loadData = async () => {
    try {
      const [classroomData, modulesData] = await Promise.all([
        apiService.getClassroom(id!),
        apiService.getModules(id!),
      ]);
      setClassroom(classroomData);
      setModules(modulesData);
      if (modulesData.length > 0) {
        setSelectedModule(modulesData[0].id);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadQuizzes = async (moduleId: string) => {
    try {
      const data = await apiService.getQuizzes(moduleId);
      setQuizzes(data);
    } catch (error) {
      console.error('Failed to load quizzes:', error);
    }
  };

  const startQuiz = (quizId: string) => {
    window.location.href = `/quiz/${quizId}`;
  };

  const goToLeitner = () => {
    window.location.href = `/leitner/${id}`;
  };

  if (loading) return <div>Loading...</div>;
  if (!classroom) return <div>Classroom not found</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => window.history.back()} style={{ padding: '8px 16px', marginRight: '10px' }}>
          ← Back
        </button>
        <button onClick={goToLeitner} style={{ padding: '8px 16px' }}>
          Leitner Review
        </button>
      </div>

      <h1>{classroom.name}</h1>
      <p>Level: {classroom.level} | Code: {classroom.code} | Students: {classroom.studentCount}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', marginTop: '30px' }}>
        <div>
          <h2>Modules</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {modules.map((module) => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                style={{
                  padding: '15px',
                  border: selectedModule === module.id ? '2px solid #007bff' : '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: module.isLocked ? 'not-allowed' : 'pointer',
                  opacity: module.isLocked ? 0.5 : 1,
                  backgroundColor: selectedModule === module.id ? '#f0f8ff' : 'white',
                }}
              >
                <strong>{module.name}</strong>
                {module.isLocked && <div style={{ fontSize: '12px', color: '#999' }}>🔒 Locked</div>}
                <div style={{ fontSize: '12px', color: '#666' }}>{module.category}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Quizzes</h2>
          {quizzes.length === 0 ? (
            <p>No quizzes available in this module.</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    opacity: quiz.isLocked ? 0.5 : 1,
                  }}
                >
                  <h3>{quiz.title}</h3>
                  <p>Questions: {quiz.questionCount}</p>
                  <p>Min Score: {quiz.minScoreToUnlockNext}/20</p>
                  {quiz.isLocked && <p style={{ color: '#999' }}>🔒 Locked - Complete prerequisite first</p>}
                  {!quiz.isLocked && quiz.isActive && (
                    <button
                      onClick={() => startQuiz(quiz.id)}
                      style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}
                    >
                      Start Quiz
                    </button>
                  )}
                  {!quiz.isActive && <p style={{ color: '#999' }}>Inactive</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

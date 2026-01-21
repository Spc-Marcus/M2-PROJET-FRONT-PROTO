import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import { ClassroomDto, ModuleDto, QuizDto, QuestionCreateDto, QuestionType } from '../types';

export const TeacherClassroomPage = () => {
  const { id } = useParams<{ id: string }>();
  const [classroom, setClassroom] = useState<ClassroomDto | null>(null);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [quizzes, setQuizzes] = useState<QuizDto[]>([]);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [newModule, setNewModule] = useState({ name: '', category: '' });
  const [newQuiz, setNewQuiz] = useState({ title: '', minScoreToUnlockNext: 15 });

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

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createModule(id!, newModule);
      setShowModuleForm(false);
      setNewModule({ name: '', category: '' });
      loadData();
    } catch (error) {
      console.error('Failed to create module:', error);
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModule) return;

    try {
      await apiService.createQuiz(selectedModule, {
        ...newQuiz,
        isActive: true,
      });
      setShowQuizForm(false);
      setNewQuiz({ title: '', minScoreToUnlockNext: 15 });
      loadQuizzes(selectedModule);
    } catch (error) {
      console.error('Failed to create quiz:', error);
    }
  };

  const handleRegenerateCode = async () => {
    try {
      const { newCode } = await apiService.regenerateCode(id!);
      alert(`New classroom code: ${newCode}`);
      loadData();
    } catch (error) {
      console.error('Failed to regenerate code:', error);
    }
  };

  if (!classroom) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => window.history.back()} style={{ padding: '8px 16px' }}>
          ← Back
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>{classroom.name}</h1>
          <p>Level: {classroom.level} | Students: {classroom.studentCount}</p>
          <p>
            Access Code: <strong>{classroom.code}</strong>
            <button onClick={handleRegenerateCode} style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '14px' }}>
              Regenerate
            </button>
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowModuleForm(!showModuleForm)}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}
          >
            Add Module
          </button>
        </div>
      </div>

      {showModuleForm && (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Create New Module</h3>
          <form onSubmit={handleCreateModule}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
              <input
                type="text"
                value={newModule.name}
                onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                required
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
              <input
                type="text"
                value={newModule.category}
                onChange={(e) => setNewModule({ ...newModule, category: e.target.value })}
                required
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Create Module
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
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
                  cursor: 'pointer',
                  backgroundColor: selectedModule === module.id ? '#f0f8ff' : 'white',
                }}
              >
                <strong>{module.name}</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>{module.category}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2>Quizzes</h2>
            {selectedModule && (
              <button
                onClick={() => setShowQuizForm(!showQuizForm)}
                style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}
              >
                Add Quiz
              </button>
            )}
          </div>

          {showQuizForm && (
            <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Create New Quiz</h3>
              <form onSubmit={handleCreateQuiz}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                  <input
                    type="text"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Min Score to Unlock Next:</label>
                  <input
                    type="number"
                    value={newQuiz.minScoreToUnlockNext}
                    onChange={(e) => setNewQuiz({ ...newQuiz, minScoreToUnlockNext: parseInt(e.target.value) })}
                    min={0}
                    max={20}
                    required
                    style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                  />
                </div>
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                  Create Quiz
                </button>
              </form>
            </div>
          )}

          {quizzes.length === 0 ? (
            <p>No quizzes in this module.</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}
                >
                  <h3>{quiz.title}</h3>
                  <p>Questions: {quiz.questionCount}</p>
                  <p>Min Score: {quiz.minScoreToUnlockNext}/20</p>
                  <p>Status: {quiz.isActive ? 'Active' : 'Inactive'}</p>
                  <button
                    onClick={() => window.location.href = `/teacher/quiz/${quiz.id}/questions`}
                    style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}
                  >
                    Manage Questions
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { ClassroomDetailPage } from './pages/ClassroomDetailPage';
import { QuizSessionPage } from './pages/QuizSessionPage';
import { LeitnerPage } from './pages/LeitnerPage';
import { TeacherClassroomPage } from './pages/TeacherClassroomPage';
import { QuestionManagementPage } from './pages/QuestionManagementPage';
import './App.css';

function App() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {user && (
          <nav style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{ margin: 0 }}>Duobingo</h2>
              <p style={{ margin: 0, fontSize: '14px' }}>{user.email} - {user.role}</p>
            </div>
            <div>
              <button
                onClick={() => window.location.href = '/'}
                style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}
              >
                Home
              </button>
              <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              user ? (
                user.role === 'STUDENT' ? <StudentDashboard /> : <TeacherDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Student Routes */}
          <Route
            path="/classroom/:id"
            element={user ? <ClassroomDetailPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/quiz/:quizId"
            element={user ? <QuizSessionPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/leitner/:classroomId"
            element={user ? <LeitnerPage /> : <Navigate to="/login" />}
          />
          
          {/* Teacher Routes */}
          <Route
            path="/teacher/classroom/:id"
            element={user?.role === 'TEACHER' ? <TeacherClassroomPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/teacher/quiz/:quizId/questions"
            element={user?.role === 'TEACHER' ? <QuestionManagementPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

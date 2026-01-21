import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import { LeitnerBoxesStatusDto, LeitnerSessionStartResponseDto, LeitnerSessionResultDto, SubmitAnswerDto } from '../types';

export const LeitnerPage = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const [status, setStatus] = useState<LeitnerBoxesStatusDto | null>(null);
  const [session, setSession] = useState<LeitnerSessionStartResponseDto | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<LeitnerSessionResultDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatus();
  }, [classroomId]);

  const loadStatus = async () => {
    try {
      const data = await apiService.getLeitnerStatus(classroomId!);
      setStatus(data);
    } catch (error) {
      console.error('Failed to load Leitner status:', error);
    } finally {
      setLoading(false);
    }
  };

  const startReview = async (questionCount: 5 | 10 | 15 | 20) => {
    try {
      const data = await apiService.startLeitnerSession(classroomId!, { questionCount });
      setSession(data);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Failed to start Leitner session:', error);
    }
  };

  const handleAnswer = async (answer: any) => {
    if (!session) return;

    const currentQuestion = session.questions[currentQuestionIndex];
    const submitData: SubmitAnswerDto = {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      ...answer,
    };

    try {
      await apiService.submitLeitnerAnswer(session.sessionId, submitData);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }

    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishReview();
    }
  };

  const finishReview = async () => {
    if (!session) return;

    try {
      const resultData = await apiService.finishLeitnerSession(session.sessionId);
      setResult(resultData);
    } catch (error) {
      console.error('Failed to finish Leitner session:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!status) return <div>No Leitner data available</div>;

  if (result) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Review Session Complete!</h1>
        <div style={{ marginTop: '30px' }}>
          <h2>Results</h2>
          <p>Correct Answers: {result.correctAnswers}</p>
          <p>Wrong Answers: {result.wrongAnswers}</p>
          <p>Accuracy: {(result.accuracyRate * 100).toFixed(1)}%</p>
          
          <h3 style={{ marginTop: '30px' }}>Box Movements</h3>
          <p>Promoted: {result.boxMovements.promoted} questions</p>
          <p>Demoted: {result.boxMovements.demoted} questions</p>
        </div>
        <button
          onClick={() => {
            setSession(null);
            setResult(null);
            loadStatus();
          }}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '30px' }}
        >
          Start New Review
        </button>
        <button
          onClick={() => window.history.back()}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '30px', marginLeft: '10px' }}
        >
          Back to Classroom
        </button>
      </div>
    );
  }

  if (session) {
    const currentQuestion = session.questions[currentQuestionIndex];
    
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              Question {currentQuestionIndex + 1} of {session.questions.length}
            </span>
            <span>Box Level: {currentQuestion.currentBox}</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginTop: '10px' }}>
            <div
              style={{
                width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%`,
                height: '100%',
                backgroundColor: '#28a745',
                borderRadius: '4px',
                transition: 'width 0.3s',
              }}
            />
          </div>
        </div>

        <div>
          <h2>{currentQuestion.contentText}</h2>
          {currentQuestion.mediaUrl && (
            <img src={currentQuestion.mediaUrl} alt="Question" style={{ maxWidth: '400px' }} />
          )}
          
          {currentQuestion.type === 'QCM' || currentQuestion.type === 'VRAI_FAUX' ? (
            <div style={{ marginTop: '20px' }}>
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer({ selectedOptionId: option.id })}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '15px',
                    marginBottom: '10px',
                    textAlign: 'left',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                  }}
                >
                  {option.textChoice}
                </button>
              ))}
            </div>
          ) : currentQuestion.type === 'TEXT' ? (
            <div style={{ marginTop: '20px' }}>
              <input
                type="text"
                placeholder="Enter your answer"
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswer({ textResponse: (e.target as HTMLInputElement).value });
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input') as HTMLInputElement;
                  handleAnswer({ textResponse: input.value });
                }}
                style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAnswer({})}
              style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
            >
              Skip Question (Simplified for prototype)
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => window.history.back()} style={{ padding: '8px 16px', marginBottom: '20px' }}>
        ← Back
      </button>

      <h1>Leitner Review System</h1>
      <p>{status.classroomName}</p>

      <div style={{ marginTop: '30px' }}>
        <h2>Your Progress</h2>
        <p>Total Questions: {status.totalQuestions}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h3>Box Distribution</h3>
          {status.boxes.map((box) => (
            <div key={box.level} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Box {box.level}</span>
                <span>{box.questionCount} questions ({box.percentage.toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '30px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
                <div
                  style={{
                    width: `${box.percentage}%`,
                    height: '100%',
                    backgroundColor: `hsl(${box.level * 60}, 70%, 50%)`,
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3>Start a Review Session</h3>
          <p>Choose the number of questions you want to review:</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            {[5, 10, 15, 20].map((count) => (
              <button
                key={count}
                onClick={() => startReview(count as 5 | 10 | 15 | 20)}
                style={{
                  padding: '15px 30px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  border: '2px solid #007bff',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                }}
              >
                {count} Questions
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

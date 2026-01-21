import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import type { GameSessionStartDto, QuestionResponseDto, SubmitAnswerDto, SessionResultDto } from '../types';

export const QuizSessionPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [session, setSession] = useState<GameSessionStartDto | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, any>>(new Map());
  const [result, setResult] = useState<SessionResultDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startSession();
  }, [quizId]);

  const startSession = async () => {
    try {
      const data = await apiService.startSession(quizId!);
      setSession(data);
    } catch (error) {
      console.error('Failed to start session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: any) => {
    if (!session) return;

    const currentQuestion = session.questions[currentQuestionIndex];
    const newAnswers = new Map(answers);
    newAnswers.set(currentQuestion.id, answer);
    setAnswers(newAnswers);

    const submitData: SubmitAnswerDto = {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      ...answer,
    };

    try {
      await apiService.submitAnswer(session.sessionId, submitData);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }

    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const finishQuiz = async () => {
    if (!session) return;

    try {
      const resultData = await apiService.finishSession(session.sessionId);
      setResult(resultData);
    } catch (error) {
      console.error('Failed to finish session:', error);
    }
  };

  const renderQuestion = (question: QuestionResponseDto) => {
    switch (question.type) {
      case 'QCM':
      case 'VRAI_FAUX':
        return (
          <div>
            <h2>{question.contentText}</h2>
            {question.mediaUrl && <img src={question.mediaUrl} alt="Question" style={{ maxWidth: '400px' }} />}
            <div style={{ marginTop: '20px' }}>
              {question.options?.map((option) => (
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
          </div>
        );

      case 'TEXT':
        return (
          <div>
            <h2>{question.contentText}</h2>
            {question.mediaUrl && <img src={question.mediaUrl} alt="Question" style={{ maxWidth: '400px' }} />}
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
          </div>
        );

      case 'IMAGE':
        return (
          <div>
            <h2>{question.contentText}</h2>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={question.mediaUrl}
                alt="Question"
                style={{ maxWidth: '600px', cursor: 'crosshair' }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  handleAnswer({ clickedCoordinates: { x, y } });
                }}
              />
            </div>
            <p style={{ marginTop: '10px', color: '#666' }}>Click on the correct area of the image</p>
          </div>
        );

      case 'MATCHING':
        return (
          <div>
            <h2>{question.contentText}</h2>
            <p style={{ color: '#666' }}>Matching questions require custom UI - simplified for prototype</p>
            <button
              onClick={() => handleAnswer({ matchedPairs: [] })}
              style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            >
              Skip Question
            </button>
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (!session) return <div>Failed to load quiz</div>;

  if (result) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Quiz Completed!</h1>
        <div style={{ fontSize: '48px', margin: '30px 0' }}>
          {result.totalScore}/{result.maxScore}
        </div>
        <p style={{ fontSize: '24px', marginBottom: '30px' }}>
          {result.passed ? '✅ Passed!' : '❌ Not passed'}
        </p>
        <p>Minimum score required: {session.questions.length > 0 ? 15 : 0}/20</p>
        <button
          onClick={() => window.history.back()}
          style={{ padding: '10px 30px', fontSize: '18px', cursor: 'pointer', marginTop: '20px' }}
        >
          Back to Classroom
        </button>
      </div>
    );
  }

  const currentQuestion = session.questions[currentQuestionIndex];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            Question {currentQuestionIndex + 1} of {session.questions.length}
          </span>
          {currentQuestionIndex === session.questions.length - 1 && (
            <button onClick={finishQuiz} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Finish Quiz
            </button>
          )}
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginTop: '10px' }}>
          <div
            style={{
              width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%`,
              height: '100%',
              backgroundColor: '#007bff',
              borderRadius: '4px',
              transition: 'width 0.3s',
            }}
          />
        </div>
      </div>

      {renderQuestion(currentQuestion)}
    </div>
  );
};

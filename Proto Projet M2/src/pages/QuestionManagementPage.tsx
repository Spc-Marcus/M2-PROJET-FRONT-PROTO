import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import { QuestionCreateDto, QuestionType, QuestionOption } from '../types';

export const QuestionManagementPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [questions, setQuestions] = useState<QuestionCreateDto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState<QuestionCreateDto>({
    type: 'QCM',
    contentText: '',
    explanation: '',
    options: [
      { textChoice: '', isCorrect: false, displayOrder: 1 },
      { textChoice: '', isCorrect: false, displayOrder: 2 },
    ],
  });

  useEffect(() => {
    loadQuestions();
  }, [quizId]);

  const loadQuestions = async () => {
    try {
      const data = await apiService.getQuestions(quizId!);
      setQuestions(data.data);
    } catch (error) {
      console.error('Failed to load questions:', error);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createQuestion(quizId!, newQuestion);
      setShowForm(false);
      resetForm();
      loadQuestions();
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  const resetForm = () => {
    setNewQuestion({
      type: 'QCM',
      contentText: '',
      explanation: '',
      options: [
        { textChoice: '', isCorrect: false, displayOrder: 1 },
        { textChoice: '', isCorrect: false, displayOrder: 2 },
      ],
    });
  };

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [
        ...(newQuestion.options || []),
        { textChoice: '', isCorrect: false, displayOrder: (newQuestion.options?.length || 0) + 1 },
      ],
    });
  };

  const updateOption = (index: number, field: keyof QuestionOption, value: any) => {
    const updatedOptions = [...(newQuestion.options || [])];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const removeOption = (index: number) => {
    const updatedOptions = (newQuestion.options || []).filter((_, i) => i !== index);
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => window.history.back()} style={{ padding: '8px 16px' }}>
          ← Back
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Manage Questions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          {showForm ? 'Cancel' : 'Add Question'}
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Create New Question</h2>
          <form onSubmit={handleCreateQuestion}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Question Type:</label>
              <select
                value={newQuestion.type}
                onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value as QuestionType })}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              >
                <option value="QCM">Multiple Choice (QCM)</option>
                <option value="VRAI_FAUX">True/False</option>
                <option value="TEXT">Text Answer</option>
                <option value="IMAGE">Image Click</option>
                <option value="MATCHING">Matching</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Question Text:</label>
              <textarea
                value={newQuestion.contentText}
                onChange={(e) => setNewQuestion({ ...newQuestion, contentText: e.target.value })}
                required
                rows={3}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Explanation:</label>
              <textarea
                value={newQuestion.explanation}
                onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                required
                rows={2}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>

            {(newQuestion.type === 'QCM' || newQuestion.type === 'VRAI_FAUX') && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Options:</label>
                {newQuestion.options?.map((option, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Option text"
                      value={option.textChoice}
                      onChange={(e) => updateOption(index, 'textChoice', e.target.value)}
                      required
                      style={{ flex: 1, padding: '8px', fontSize: '16px' }}
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(e) => updateOption(index, 'isCorrect', e.target.checked)}
                      />
                      Correct
                    </label>
                    {index > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        style={{ padding: '8px', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addOption} style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}>
                  Add Option
                </button>
              </div>
            )}

            {newQuestion.type === 'TEXT' && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Accepted Answer:</label>
                <input
                  type="text"
                  value={newQuestion.textConfig?.acceptedAnswer || ''}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      textConfig: {
                        acceptedAnswer: e.target.value,
                        isCaseSensitive: false,
                        ignoreSpellingErrors: true,
                      },
                    })
                  }
                  required
                  style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                />
              </div>
            )}

            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Create Question
            </button>
          </form>
        </div>
      )}

      <h2>Existing Questions ({questions.length})</h2>
      {questions.length === 0 ? (
        <p>No questions yet. Create your first question!</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {questions.map((question, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3>Question {index + 1}</h3>
                  <p><strong>Type:</strong> {question.type}</p>
                  <p><strong>Text:</strong> {question.contentText}</p>
                  <p><strong>Explanation:</strong> {question.explanation}</p>
                  
                  {question.type === 'QCM' || question.type === 'VRAI_FAUX' ? (
                    <div style={{ marginTop: '10px' }}>
                      <strong>Options:</strong>
                      <ul>
                        {question.options?.map((option, i) => (
                          <li key={i} style={{ color: option.isCorrect ? 'green' : 'black' }}>
                            {option.textChoice} {option.isCorrect && '✓'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : question.type === 'TEXT' ? (
                    <p><strong>Accepted Answer:</strong> {question.textConfig?.acceptedAnswer}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, nextQuestion, resetQuiz } from './quizSlice';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, status, error } = useSelector((state) => state.quiz);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  const handleAnswerSubmit = () => {
    dispatch(nextQuestion(selectedAnswer));
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 === questions.length) {
      navigate('/results');
    }
  };

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>;
  }

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <h1>Quiz</h1>
      <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      <form>
        <ul className="list-group mb-5">
          {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort().map((answer, idx) => (
            <li key={idx} className="list-group-item">
              <input
                type="checkbox"
                id={`answer-${idx}`}
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => setSelectedAnswer(answer)}
              />
              <label htmlFor={`answer-${idx}`} dangerouslySetInnerHTML={{ __html: answer }} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAnswerSubmit}
          disabled={selectedAnswer === null}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Quiz;

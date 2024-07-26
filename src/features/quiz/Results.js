import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from './quizSlice';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, answers } = useSelector((state) => state.quiz);

  const score = answers.reduce((acc, answer, idx) => {
    return acc + (answer === questions[idx].correct_answer ? 1 : 0);
  }, 0);

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Quiz Results</h1>
      <p className="text-2xl mb-5">Your score: {score} / {questions.length}</p>
      <button className="btn btn-primary" onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
};

export default Results;

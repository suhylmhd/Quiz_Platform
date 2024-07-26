import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../quiz/quizSlice';
import { Link } from 'react-router-dom';
import './AdminPanel.css'; 

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState(['']);
  const [questionType, setQuestionType] = useState('multiple');

  const handleAddQuestion = () => {
    const newQuestion = {
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      type: questionType,
    };
    dispatch(addQuestion(newQuestion));
    // Reset form fields
    setQuestion('');
    setCorrectAnswer('');
    setIncorrectAnswers(['']);
  };

  const handleAddIncorrectAnswer = () => {
    setIncorrectAnswers([...incorrectAnswers, '']);
  };

  const handleIncorrectAnswerChange = (index, value) => {
    const updatedAnswers = incorrectAnswers.map((answer, i) => (i === index ? value : answer));
    setIncorrectAnswers(updatedAnswers);
  };

  return (
    <div className="container admin-container">
      <div className="admin-box">
        <h1>Admin Panel</h1>
        <div className="form-group">
          <label>Question Type:</label>
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className="form-control">
            <option value="single">Single Answer</option>
            <option value="multiple">Multiple Choice</option>
          </select>
        </div>
        <div className="form-group">
          <label>Question:</label>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Correct Answer:</label>
          <input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Incorrect Answers:</label>
          {incorrectAnswers.map((answer, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                value={answer}
                onChange={(e) => handleIncorrectAnswerChange(index, e.target.value)}
                className="form-control"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddIncorrectAnswer} className="btn btn-secondary">
            Add Incorrect Answer
          </button>
        </div>
        <div className="button-group">
          <button type="button" onClick={handleAddQuestion} className="btn btn-primary">
            Add Question
          </button>
          <Link to="/quiz">
            <button className="btn btn-green">Start Quiz</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, nextQuestion, resetQuiz } from './quizSlice';
import { useNavigate } from 'react-router-dom';
import './Quiz.css'; // Updated Quiz.css

const Quiz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, currentQuestionIndex, status, error } = useSelector((state) => state.quiz);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchQuestions());
        }
    }, [status, dispatch]);

    const handleAnswerSubmit = () => {
        if (selectedAnswer) {
            const correct = selectedAnswer === currentQuestion.correct_answer;
            setIsCorrect(correct);
            setIsAnswerSubmitted(true);
        }
    };

    const handleNextQuestion = () => {
        setIsAnswerSubmitted(false);
        dispatch(nextQuestion(selectedAnswer));
        setSelectedAnswer(null);
        if (currentQuestionIndex + 1 === questions.length) {
            navigate('/results');
        }
    };

    if (status === 'loading') {
        return <div className="loading-container"><div className="loader"></div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="error-container"><div className="error-icon"></div>Error: {error}</div>;
    }

    if (questions.length === 0) {
        return null;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <section className="quiz-section">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="quiz-card">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='question-text'>{currentQuestion?.question}</h5>
                                <h5 className="question-counter">
                                    {currentQuestionIndex + 1} / {questions.length}
                                </h5>
                            </div>
                            <div className="options-container">
                                {currentQuestion?.incorrect_answers.concat(currentQuestion.correct_answer).sort().map((item, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${selectedAnswer === item && 'selected-answer'}`}
                                        onClick={() => setSelectedAnswer(item)}
                                        disabled={isAnswerSubmitted}  // Disable buttons after submission
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {isAnswerSubmitted && (
                                <div className="answer-feedback">
                                    <p className={`feedback-text ${isCorrect ? 'correct' : 'incorrect'}`}>
                                        {isCorrect ? 'Correct!' : `Incorrect! The correct answer is: ${currentQuestion.correct_answer}`}
                                    </p>
                                    <p className="explanation-text">
                                        {currentQuestion.explanation}
                                    </p>
                                </div>
                            )}

                            <button 
                                className={`submit-button ${!selectedAnswer && 'disabled-button'}`} 
                                onClick={isAnswerSubmitted ? handleNextQuestion : handleAnswerSubmit} 
                                disabled={!selectedAnswer && !isAnswerSubmitted}
                            >
                                {isAnswerSubmitted ? (currentQuestionIndex + 1 !== questions.length ? 'Next Question' : 'Show Result') : 'Submit Answer'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;

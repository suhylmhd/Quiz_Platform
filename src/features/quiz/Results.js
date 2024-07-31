import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from './quizSlice';
import { useNavigate } from 'react-router-dom';
import './Results.css';

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
        <section className="bg-custom-dark">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className={`text-center custom-rounded ${score > (questions.length / 2) ? 'bg-custom-success' : 'bg-custom-danger'}`}>
                            <h1 className='mb-2 fw-bold'>{score > (questions.length / 2) ? 'Awesome!' : 'Oops!'}</h1>
                            <h3 className='mb-3 fw-bold'>Your score is {score} out of {questions.length}</h3>

                            <button onClick={handleRestart} className='btn-custom py-2 px-4 btn-custom-light fw-bold d-inline'>Start Over</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Results;

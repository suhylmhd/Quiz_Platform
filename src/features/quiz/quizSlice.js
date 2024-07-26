import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionsData from '../../questions.json'; 

// Fetch questions from local storage or default JSON
export const fetchQuestions = createAsyncThunk('quiz/fetchQuestions', async (_, { rejectWithValue }) => {
  try {
    const savedQuestions = JSON.parse(localStorage.getItem('questions'));
    const questions = savedQuestions || questionsData;
    return questions;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addQuestion = createAsyncThunk('quiz/addQuestion', async (questionData, { rejectWithValue }) => {
  try {
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || questionsData;
    const updatedQuestions = [...savedQuestions, questionData];
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    return questionData;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    nextQuestion(state, action) {
      state.currentQuestionIndex += 1;
      state.answers.push(action.payload);
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      });
  },
});

export const { nextQuestion, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;

import React, { useState, useEffect } from "react";
import Question from "./Question";

const API_URL = "https://the-trivia-api.com/api/questions";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch(`${API_URL}?limit=5`);
    const data = await response.json();
    setQuestions(data);
    setCurrentQuestion(data[0]);
  };

  const reset = () => {
    fetchQuestions();
    setQuestions([]);
    setCurrentQuestion(null);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCorrectAnswer(currentQuestion.correctAnswer);
    setTimeout(() => {
      setCorrectAnswer(null);
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1000);
  };

  if (questions.length > 0 && currentQuestionIndex >= questions.length) {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Quiz</h1>
        </div>
        <div className="App-content">
          <p>
            Your final score is {score} / {questions.length}
          </p>
          <br />
          <button onClick={reset}>Retry Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Quiz</h1>
      </div>
      <div className="App-content">
        <Question
          question={currentQuestion}
          correctAnswer={correctAnswer}
          nextQuestion={nextQuestion}
        />
        <br />
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default App;

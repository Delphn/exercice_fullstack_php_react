import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import QuizConfig from "./components/QuizConfig";

const API_URL = "https://the-trivia-api.com/api/questions";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showConfig, setShowConfig] = useState(true);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [config, setConfig] = useState({
    limit: 5,
    category: "",
    difficulty: "",
    tags: "",
  });

  useEffect(() => {
    if (!showConfig) {
      fetchQuestions();
    } else {
      getTags().then((data) => setTags(data));
      getCategories().then((data) => setCategories(data));
    }
  }, [showConfig]);

  const handleStartQuiz = () => {
    setConfig({ ...config, showConfig: false });
    setShowConfig(false);
  };

  const handleResetConfig = () => {
    setConfig({
      limit: 5,
      category: "",
      difficulty: "",
      tags: "",
    });
  };

  const fetchQuestions = async () => {
    const queryString = Object.entries(config)
      .map(([key, value]) => {
        if (value) {
          return `${key}=${value}`;
        }
        return "";
      })
      .filter((value) => value !== "")
      .join("&");

    const response = await fetch(`${API_URL}?${queryString}`);
    const data = await response.json();
    setQuestions(data);
    setCurrentQuestion(data[0]);
  };

  const getTags = async () => {
    const response = await fetch("https://the-trivia-api.com/api/tags");
    const data = await response.json();
    return data;
  };

  const getCategories = async () => {
    const response = await fetch("https://the-trivia-api.com/api/categories");
    const data = await response.json();
    return data;
  };

  const reset = () => {
    setQuestions([]);
    setCurrentQuestion(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowConfig(true);
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
        {showConfig ? (
          <QuizConfig
            config={config}
            setConfig={setConfig}
            categories={categories}
            onStartQuiz={handleStartQuiz}
            onResetConfig={handleResetConfig}
            tags={tags}
          />
        ) : (
          <div>
            <Question
              question={currentQuestion}
              correctAnswer={correctAnswer}
              index={currentQuestionIndex}
              nextQuestion={nextQuestion}
              totalNumberOfQuestions={questions.length}
            />
            <br />
            <p>Score: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

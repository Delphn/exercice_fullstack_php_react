import React, { useState, useEffect } from "react";
import Question from "./Question";

const API_URL = "https://the-trivia-api.com/api/questions";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showConfig, setShowConfig] = useState(true);
  const [config, setConfig] = useState({
    limit: 5,
    category: null,
    difficulty: null,
    tags: null,
    question_region: null
  });

  useEffect(() => {
    if (!showConfig) {
      fetchQuestions();
    }
  }, [showConfig]);

  useEffect(() => {
    fetchQuestions();
  }, []);

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
          <div className="config-container">
            <div className="config-item">
              <label htmlFor="limit">Number of questions:</label>
              <input
                type="number"
                id="limit"
                value={config.limit}
                onChange={(event) =>
                  setConfig({ ...config, limit: event.target.value })
                }
              />
            </div>
            <div className="config-item">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={config.category}
                onChange={(event) =>
                  setConfig({ ...config, category: event.target.value })
                }
              >
                <option value={null}>Any</option>
                <option value={9}>General Knowledge</option>
                <option value={10}>Entertainment: Books</option>
                <option value={11}>Entertainment: Film</option>
                <option value={12}>Entertainment: Music</option>
                <option value={13}>Entertainment: Musicals & Theatres</option>
                <option value={14}>Entertainment: Television</option>
                <option value={15}>Entertainment: Video Games</option>
                <option value={16}>Entertainment: Board Games</option>
                <option value={17}>Science & Nature</option>
                <option value={18}>Science: Computers</option>
                <option value={19}>Science: Mathematics</option>
                <option value={20}>Mythology</option>
                <option value={21}>Sports</option>
                <option value={22}>Geography</option>
                <option value={23}>History</option>
                <option value={24}>Politics</option>
                <option value={25}>Art</option>
                <option value={26}>Celebrities</option>
                <option value={27}>Animals</option>
                <option value={28}>Vehicles</option>
                <option value={29}>Entertainment: Comics</option>
                <option value={30}>Science: Gadgets</option>
                <option value={31}>
                  Entertainment: Japanese Anime & Manga
                </option>
                <option value={32}>Entertainment: Cartoon & Animations</option>
              </select>
            </div>
            <div className="config-item">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={config.difficulty}
                onChange={(event) =>
                  setConfig({ ...config, difficulty: event.target.value })
                }
              >
                <option value={null}>Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="config-item">
              <button onClick={() => setShowConfig(false)}>Start Quiz</button>
            </div>
          </div>
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

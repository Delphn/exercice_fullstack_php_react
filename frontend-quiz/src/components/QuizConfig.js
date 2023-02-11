import React from "react";

const QuizConfig = ({ config, setConfig, categories, tags, onStartQuiz, onResetConfig }) => {

  return (
    <div className="config-container">
      <div className="config-item">
        <label htmlFor="limit">Number of questions:</label>
        <input
          className="config-select"
          type="number"
          id="limit"
          value={config.limit}
          onChange={(event) =>
            setConfig({ ...config, limit: event.target.value })
          }
        />
      </div>
      <div className="config-item">
        <label htmlFor="tags">Select a Tag:</label>
        <select
          className="config-select"
          name="tags"
          id="tags"
          value={config.tags}
          onChange={(event) =>
            setConfig({ ...config, tags: event.target.value })
          }
        >
          <option value="">--Select a Tag--</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="config-item">
        <label htmlFor="category">Category:</label>
        <select
          className="config-select"
          id="category"
          value={config.category}
          onChange={(event) =>
            setConfig({ ...config, category: event.target.value })
          }
        >
          <option value="">--Select a Category--</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="config-item">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          className="config-select"
          id="difficulty"
          value={config.difficulty}
          onChange={(event) =>
            setConfig({ ...config, difficulty: event.target.value })
          }
        >
          <option value="">--Select a Difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button className="config-button" onClick={onResetConfig}>
        Reset Config
      </button>
      <button className="onfig-button" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizConfig;

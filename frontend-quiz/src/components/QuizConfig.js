import React from "react";

const QuizConfig = ({ config, setConfig, categories, tags, onStartQuiz, onResetConfig }) => {

  const handleChange = (property, event) => {
    setConfig({ ...config, [property]: event.target.value });
  };

  return (
    <div className="config-container">
      <div className="config-item">
        <label htmlFor="limit">Number of questions:</label>
        <input
          className="config-select"
          type="number"
          id="limit"
          value={config.limit}
          onChange={(event) => handleChange("limit", event)}
        />
      </div>
      <div className="config-item">
        <label htmlFor="tags">Select a tag:</label>
        <select
          className="config-select"
          name="tags"
          id="tags"
          value={config.tags}
          onChange={(event) => handleChange("tag", event)}
        >
          <option value="">--Select a tag--</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="config-item">
        <label htmlFor="category">Select a category:</label>
        <select
          className="config-select"
          id="category"
          value={config.categories}
          onChange={(event) => handleChange("categories", event)}
        >
          <option value="">--Select a category--</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="config-item">
        <label htmlFor="difficulty">Choose difficulty:</label>
        <select
          className="config-select"
          id="difficulty"
          value={config.difficulty}
          onChange={(event) => handleChange("difficulty", event)}
        >
          <option value="">--Choose difficulty--</option>
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

import React, { useState, useEffect } from "react";

const Question = (props) => {
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState(null);

  const {
    index,
    totalNumberOfQuestions,
    question,
    nextQuestion,
    correctAnswer,
  } = props;

  useEffect(() => {
    setSelected(null);
  }, [question]);

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * (question?.incorrectAnswers.length + 1)
    );
    const allAnswers = question?.incorrectAnswers;
    allAnswers?.splice(randomIndex, 0, question?.correctAnswer);
    setOptions(allAnswers);
  }, [question?.incorrectAnswers]);

  const handleClick = () => {
    if (selected === question?.correctAnswer) {
      nextQuestion(true);
    } else {
      nextQuestion(false);
    }
  };

  const handleAnswerClick = (answer) => {
    setSelected(answer);
  };

  return (
    <div className="question-container">
      <div style={{ fontWeight: "bold" }}>
        {index + 1}/{totalNumberOfQuestions}: {question?.question}
      </div>
      <br />
      <div className="question-answers">
        {options?.map((answer, idx) => (
          <div
            key={idx}
            onClick={() => handleAnswerClick(answer)}
            className={`
              question
              ${answer === selected ? "selected-answer" : ""}
              ${answer === correctAnswer ? "correct-answer" : ""}
            `}
          >
            {answer}
          </div>
        ))}
      </div>
      <button onClick={handleClick}>Validate</button>
    </div>
  );
};

export default Question;

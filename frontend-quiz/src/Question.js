import React, { useState, useEffect } from "react";

const Question = (props) => {
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [props.question]);

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * (props.question?.incorrectAnswers.length + 1)
    );
    const allAnswers = props.question?.incorrectAnswers;
    allAnswers?.splice(randomIndex, 0, props.question?.correctAnswer);
    setOptions(allAnswers);
  }, [props.question?.incorrectAnswers]);

  const handleClick = () => {
    if (selected === props.question?.correctAnswer) {
      props.nextQuestion(true);
    } else {
      props.nextQuestion(false);
    }
  };

  const handleAnswerClick = (answer) => {
    setSelected(answer);
  };

  return (
    <div className="question-container">
      <div style={{ fontWeight: "bold" }}>{props.question?.question}</div>
      <br />
      <div className="question-answers">
        {options?.map((answer, index) => (
          <div
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={`
              question
              ${answer === selected ? "selected-answer" : ""}
              ${answer === props.correctAnswer ? "correct-answer" : ""}
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

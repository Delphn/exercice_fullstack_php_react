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
      <p>{props.question?.question}</p>
      <div className="question-answers">
        {options?.map((answer, index) => (
          <p
            key={index}
            onClick={() => handleAnswerClick(answer)}
            style={{ color: answer === selected ? "green" : "" }}
          >
            {answer}
          </p>
        ))}
      </div>
      <button onClick={handleClick}>Validate</button>
    </div>
  );
};

export default Question;

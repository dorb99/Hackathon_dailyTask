import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../components/userContext";
import "./questionPresentPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const questionPresentPage = (props) => {
  const { userInfo, answerQuestionAction } = useContext(UserContext);
  //   const location = useLocation();
  //   const { question } = location.state
  const question = {
    id: "65df43efbdeab5092c52e7ce",
    question: "what is 2+2",
    answers: ["8", "5", "4", "1231"],
    correctAnswer: "2",
  };
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonColor, setButtonColor] = useState(["", "", "", ""]);

  const handleClick = (place) => {
    if (place === question?.correctAnswer) {
      const updatedColor = [...buttonColor];
      updatedColor[place - 1] = "green";
      setButtonColor(updatedColor);
      setButtonClicked(true);
      answerQuestionAction({ answer: place, questionId: question.id });
      setTimeout(() => {
        navigate("/userHome");
      }, 3000);
    } else {
      const updatedColor = [...buttonColor];
      updatedColor[question?.correctAnswer - 1] = "green";
      updatedColor[place - 1] = "red";
      setButtonColor(updatedColor);
      setButtonClicked(true);
      answerQuestionAction({ answer: place, questionId: question.id });
      setTimeout(() => {
        navigate("/userHome");
      }, 3000);

    }
  };

  return (
    <div className="page">
      <div className="login_Container">
        <h2 className="header"> {userInfo?.classes}</h2>
        <p className="smallP">Hello {userInfo?.fullName}</p>
        <div className="answer_Container">
          <button
            type="submit"
            className="answerBtn"
            onClick={() => handleClick("1")}
            disabled={buttonClicked}
            style={{ backgroundColor: buttonColor[0] }}
          >
            {question?.answers[0]}
          </button>
          <button
            type="submit"
            className="answerBtn"
            onClick={() => handleClick("2")}
            disabled={buttonClicked}
            style={{ backgroundColor: buttonColor[1] }}
          >
            {question?.answers[1]}
          </button>
          <button
            type="submit"
            className="answerBtn"
            onClick={() => handleClick("3")}
            disabled={buttonClicked}
            style={{ backgroundColor: buttonColor[2] }}
          >
            {question?.answers[2]}
          </button>
          <button
            type="submit"
            className="answerBtn"
            onClick={() => handleClick("4")}
            disabled={buttonClicked}
            style={{ backgroundColor: buttonColor[3] }}
          >
            {question?.answers[3]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default questionPresentPage;

import React, { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./createQuestionPage.css";
import { UserContext } from "../../components/userContext";
import { SocketContext } from "../../components/socketContext";

const createQuestionPage = () => {
  const { addQuestionAction } = useContext(UserContext);
  const { sendQuestion } = useContext(SocketContext);
  const location = useLocation();
  const room = location.state;
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answers: [],
    correctAnswer: "",
    roomId: room.roomId,
  });

  const handleSent = (e) => {
    e.preventDefault();
    addQuestionAction(newQuestion);
    sendQuestion(newQuestion);
    navigate("/userHome")
  };

  return (
    <div className="page">
      <div className="login_Container">
        <h2 className="header">Hi!</h2>
        <p className="smallP">Enter your qustion here </p>
        <form onSubmit={handleSent}>
          <input
            type="text"
            required
            className="smallInput"
            placeholder="question..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newQuestion;
              addInput.question = e.target.value;
              setNewQuestion(addInput);
            }}
          />
          <input
            type="text"
            required
            className="smallanswerInput"
            placeholder="answer1..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newQuestion;
              addInput.answers[0] = e.target.value;
              setNewQuestion(addInput);
            }}
          />
          <input
            type="text"
            required
            className="smallanswerInput"
            placeholder="answer2..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newQuestion;
              addInput.answers[1] = e.target.value;
              setNewQuestion(addInput);
            }}
          />
          <input
            type="text"
            required
            className="smallanswerInput"
            placeholder="answer3..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newQuestion;
              addInput.answers[2] = e.target.value;
              setNewQuestion(addInput);
            }}
          />
          <input
            type="text"
            required
            className="smallanswerInput"
            placeholder="answer4..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newQuestion;
              addInput.answers[3] = e.target.value;
              setNewQuestion(addInput);
            }}
          />
          <input
            type="text"
            pattern="[0-9]*"
            required
            className="smallInput"
            placeholder="correct answer number..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newQuestion;
              addInput.correctAnswer = e.target.value;
              setNewQuestion(addInput);
            }}
          />
          <button type="submit" className="submitBtn">
            create question
          </button>
        </form>
      </div>
    </div>
  );
};

export default createQuestionPage;

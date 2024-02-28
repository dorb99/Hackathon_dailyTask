import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createQuestionPage.css";


const createQuestionPage = () => {
    const [newQustion, setNewQuestion] = useState({
        question: "",
        answers: [],
        correctAnswer: "",
      });

    const handleSent = (e) => {
        e.preventDefault();
        console.log(newQustion);

    }

  return (
<div className="page">
      <div className="login_Container">
        <h2 className="header">Hi!</h2>
        <p className="smallP">Enter your qustion here  </p>
        <form onSubmit={handleSent}>
          <input
            type="text"
            required
            className="smallInput"
            placeholder="question..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newQustion;
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
              const addInput = newQustion;
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
              const addInput = newQustion;
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
              const addInput = newQustion;
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
              const addInput = newQustion;
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
              const addInput = newQustion;
              addInput.correctAnswer = e.target.value;
              setNewQuestion(addInput);
            }}
          />

          <button type="submit" className="submitBtn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default createQuestionPage
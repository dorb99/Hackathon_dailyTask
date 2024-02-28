import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const questionPresentPage = () => {
  const [className, setClassName] = useState();
  const location = useLocation();
  const { question } = location.state;

  return (
    <div className="page">
      <div className="login_Container">
        <h2 className="header">{className}</h2>
        <p className="smallP">Please fill the following form</p>
        <button type="submit" className="submitBtn">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default questionPresentPage;

import React, { useContext } from 'react'
import { useState } from "react";
import { UserContext } from "../../components/userContext";
import "./questionPresentPage.css";

const questionPresentPage = (props) => {
    const { userInfo } = useContext(UserContext);


  return (
    <div className="page">
    <div className="login_Container">
      <h2 className="header">{userInfo}</h2>
      <p className="smallP">{userInfo}</p>
      <div className='answer_Container'>
        <button type="submit" className="answerBtn">{userInfo}</button>
        <button type="submit" className="answerBtn">{userInfo}</button>
        <button type="submit" className="answerBtn">{userInfo}</button>
        <button type="submit" className="answerBtn">{userInfo}</button>
      </div>
    </div>
  </div>
  )
}

export default questionPresentPage
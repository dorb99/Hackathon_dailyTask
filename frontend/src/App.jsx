import { io } from "socket.io-client";
import "./App.css";
import HomePage from "./pages/homePage/homePage";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/userPage/userPage";
import SigninPage from "./pages/signinPage/signinPage";
import CreateQuestionPage from "./pages/questionPages/createQuestionPage";
import QuestionPresentPage from "./pages/questionPages/questionPresentPage";

function App() {
  const socket = io.connect("http://localhost:3004");

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userHome" element={<UserPage />} />
        <Route path="/signinPage" element={<SigninPage />} />
        <Route path="/createQuestionPage" element={<CreateQuestionPage />} />
        <Route path="/questionPresentPage" element={<QuestionPresentPage />} />
      </Routes>
    </div>
  );
}

export default App;

import { io } from "socket.io-client";
import "./App.css";
import HomePage from "./pages/homePage/homePage";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/userPage/userPage";
import SigninPage from "./pages/signinPage/signinPage";
import CreateQuestionPage from "./pages/questionPages/createQuestionPage";
import QuestionPresentPage from "./pages/questionPages/questionPresentPage";
import AboutUsPage from "./pages/aboutUsPage/aboutUsPage";
import { UserContext } from "./components/userContext";
import { useContext } from "react";
import NavBar from "./pages/navBar/navBar"

function App() {
  const socket = io.connect("http://localhost:3004");
  const { userInfo } = useContext(UserContext);

  return (
    <div className="appCountainer">
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userHome" element={<UserPage />} />
        <Route path="/signinPage" element={<SigninPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/createQuestionPage" element={<CreateQuestionPage />} />
        <Route path="/questionPresentPage" element={<QuestionPresentPage />} />
      </Routes>
      <button onClick={() => console.log(userInfo)}>click</button>
    </div>
  );
}

export default App;

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const URL = import.meta.env.VITE_SERVER_URL;

  const enterUser = (Info) => {
    localStorage.setItem("userInfo", JSON.stringify(Info._id));
    setUserInfo(Info);
    navigate("/userHome", { state: { info: "hi its working" } });
  };

  const createUserAction = async (newUser) => {
    try {
      const response = await axios.post(`${URL}/api/user/create`, newUser);
      if (response.status === 402) return alert("username already in use");
      else if (response.status === 200) {

        console.log(response.data);
        setUserInfo(response.data);
        navigate("/userHome");

        enterUser(response.data);

      }
    } catch {
      (error) => {
        console.log(error);
      };
    }
  };

  const loginUserAction = async (username) => {
    try {
      const response = await axios.post(`${URL}/api/user/login`, { username });
      if (response.status === 403) {
        return alert("Username incorrect");
      } else if (response.status === 200) {

        console.log(response.data);
        setUserInfo(response.data);
        navigate("/userHome");
        

        enterUser(response.data);

      }
    } catch (error) {
      console.error(error);
    }
  };

  const addQuestionAction = async (question) => {
    try {
      const response = await axios.post(`${URL}/api/question/create`, question);
    } catch (error) {
      console.error(error);
    }
  };

  const answerQuestionAction = async (info) => {
    const answer = {
      answer: info.answer,
      questionId: info.questionId,
      userId: userInfo?.id,
    };
    try {
      const response = await axios.post(
        `${URL}/api/user/answerQuestion`,
        answer
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addClass = async (classRoom) => {
    const info = { class: classRoom, username: userInfo?.username };
    try {
      const response = await axios.post(`${URL}/api/user/addClasse`, info);
      if (response.status === 200) console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const findQuestion = async (questionId) => {
    try {
      const response = await axios.get(
        `${URL}/api/question/findQuestion/${questionId}`
      );
      if (response.status === 200) console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkId = localStorage.getItem("userInfo", JSON.stringify());
    if (checkId) loginUserAction(checkId);
    else navigate("/");
  }, []);

  const contextValues = {
    // varibales
    userInfo,
    setUserInfo,
    URL,

    // actions
    createUserAction,
    loginUserAction,
    addQuestionAction,
    answerQuestionAction,
    addClass,
    findQuestion,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

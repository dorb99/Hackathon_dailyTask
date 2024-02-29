import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [allStudents, setAllStudents] = useState([]);
  const URL = import.meta.env.VITE_SERVER_URL;

  const enterUser = (Info) => {
    getAllStudents();
    localStorage.setItem("userInfo", JSON.stringify(Info.username));
    setUserInfo(Info);
    navigate("/userHome");
  };
  const updateUser = (Info) => {
    localStorage.setItem("userInfo", JSON.stringify(Info.username));
    setUserInfo(Info);
  };

  const createUserAction = async (newUser) => {
    try {
      const response = await axios.post(`${URL}/api/user/create`, newUser);
      if (response.status === 402) return alert("username already in use");
      else if (response.status === 200) {
        enterUser(response.data);
        navigate("/userHome");
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
        return alert(`Username incorrect `);
      } else if (response.status === 200) {
        enterUser(response.data);
        console.log(response.data);
        navigate("/userHome");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getByUserName = async (username) => {
    try {
      const response = await axios.post(`${URL}/api/user/login`, { username });
      if (response.status === 403) {
        return alert(`Username incorrect `);
      } else if (response.status === 200) {
        updateUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addQuestionAction = async (question) => {
    console.log(question);
    try {
      const response = await axios.post(`${URL}/api/question/create`, question);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllStudents = async () => {
    try {
      const response = await axios.get(`${URL}/api/user/findAllStudents`);
      setAllStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const answerQuestionAction = async (info) => {
    const answer = {
      answer: info.answer,
      questionId: info.questionId,
      userId: userInfo?._id,
    };
    try {
      const response = await axios.patch(
        `${URL}/api/user/answerQuestion`,
        answer
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const addClass = async (classRoom, student) => {
    const info = { class: classRoom, id: student };
    try {
      const response = await axios.patch(`${URL}/api/user/addClass`, info);
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
  const logout = async () => {
    try {
      localStorage.removeItem("userInfo");
      setUserInfo();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      const checkId = JSON.parse(
        localStorage.getItem("userInfo", JSON.stringify())
      );
      if (checkId) getByUserName(checkId);
      else navigate("/");
    },
    [],
    [userInfo]
  );

  const contextValues = {
    // varibales
    userInfo,
    setUserInfo,
    URL,
    allStudents,

    // actions
    createUserAction,
    loginUserAction,
    addQuestionAction,
    answerQuestionAction,
    addClass,
    findQuestion,
    logout,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

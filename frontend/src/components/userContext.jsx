import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [allStudents, setAllStudents] = useState([]);
  const [leftQuestions, setLeftQuestions] = useState([]);
  const URL = import.meta.env.VITE_SERVER_URL;

  const enterUser = (Info) => {
    getAllStudents();
    localStorage.setItem("userInfo", JSON.stringify(Info.username));
    setUserInfo(Info);
  };

  const createUserAction = async (newUser) => {
    try {
      const response = await axios.post(`${URL}/api/user/create`, newUser);

      if (response.status === 406) {
        return alert("username already in use");
      } else if (response.status === 200) {
        enterUser(response.data);
        navigate("/userHome");
      } else if (response.status === 404) {
        return alert("not enough data");
      } else if (response.status === 405) {
        return alert("info is not correct");
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
        navigate("/userHome");
      } else if (response.status === 404) {
        return alert(`Username not sent `);
      } else if (response.status === 405) {
        return alert(`incorrect user  `);
      }
    } catch (error) {
      console.log(error);
      return alert("username incorrect");
    }
  };

  const getByUserName = async (username) => {
    try {
      const response = await axios.post(`${URL}/api/user/login`, { username });
      if (response.status === 405) {
        return alert(`Username incorrect `);
      } else if (response.status === 200) {

        console.log(response.data);

      }
    } catch (error) {
      console.error(error);
    }
  };

  const addQuestionAction = async (question) => {
    console.log(question);
    try {
      const response = await axios.post(`${URL}/api/question/create`, question);
      if (response.status === 403) {
        return alert(`Username incorrect `);
      } else if (response.status === 200) {
        navigate("/userHome");
      } else if (response.status === 404) {
        return alert(`Username not sent `);
      } else if (response.status === 405) {
        return alert(`Username not true `);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllStudents = async () => {
    try {
      const response = await axios.get(`${URL}/api/user/findAllStudents`);
      setAllStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteQuestion = async (info) => {
    const send = {
      questionId: info.questionId,
      userId: userInfo?._id,
    };
    try {
      const response = await axios.post(
        `${URL}/api/question/updateQuestion`,
        send
      );
      
    }catch (error) {

      console.log(error);
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
      if (response.status === 403) {
        return alert(`Question incorrect `);
      } else if (response.status === 200) {
        enterUser(response.data);
        console.log(response.data);
        navigate("/userHome");
      } else if (response.status === 404) {
        return alert(`Question not sent `);
      } else if (response.status === 405) {
        return alert(`Question not true `);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addClass = async (classRoom, student) => {
    const info = { class: classRoom, id: student };
    try {
      const response = await axios.patch(`${URL}/api/user/addClass`, info);
      if (response.status === 403) {
        return alert(`class incorrect `);
      } else if (response.status === 200) {
        enterUser(response.data);
        console.log(response.data);
        navigate("/userHome");
      } else if (response.status === 404) {
        return alert(`class not sent `);
      } else if (response.status === 405) {
        return alert(`class not true `);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const findAllQuestions = async () => {
    const id = userInfo?._id;
    try {
      const response = await axios.get(
        `${URL}/api/user/findAllQuestions/${id}`
      );
      if (response.status === 200) setLeftQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const findQuestion = async (question) => {
    try {
      const response = await axios.get(
        `${URL}/api/question/findQuestion/${question}`
      );
      if (response.status === 200) return response.data;
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
      const checkId = localStorage.getItem("userInfo", JSON.stringify());
      if (checkId) {
        const check = JSON.parse(checkId);
        getByUserName(check);
      } else navigate("/");

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
    leftQuestions,
    setLeftQuestions,

    // actions
    createUserAction,
    loginUserAction,
    addQuestionAction,
    answerQuestionAction,
    addClass,
    findQuestion,
    logout,
    findAllQuestions,
    deleteQuestion,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";
import Socket from "./socket.js";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const navigate = useNavigate();
  const socket = Socket();
  const [question, setQuestion] = useState({});
  const { userInfo, addClass } = useContext(UserContext);

  const enterClassRoom = async (classId) => {
    if (userInfo.role === "student" || userInfo.role === "teacher") {
      userInfo.classes.forEach((currentClass) => {
        if (classId === currentClass) socket_EnterRoom(classId);
        else {
          addClass(classId);
          socket_EnterRoom(classId);
        }
      });
    } else return console.log("no userInfo role");
  };

  const leaveClassRoom = async (classId) => {
    socket_LeaveRoom(classId);
  };

  const sendQuestion = async (info) => {
    socket_Question(info);
  };

  //emits
  const socket_EnterRoom = (classId) => {
    socket.emit("enter_Room", classId);
  };

  const socket_LeaveRoom = (classId) => {
    socket.emit("leave_Room", classId);
    navigate("/userHome");
  };

  const socket_Question = (info) => {
    socket.emit("send_Quesion", info);
  };

  useEffect(() => {
    const handleNewQuestion = (question) => {
      navigate("/questionPresentPage", { state: { question: question } });
    };

    const handleLastQuestion = (question) => {
      setQuestion(question);
    };
    socket.on("new_Question", handleNewQuestion);
    socket.on("latestMessage", handleLastQuestion);

    return () => {
      socket.off("new_Question", handleNewQuestion);
      socket.off("latestMessage", handleLastQuestion);
      socket.disconnect();
    };
  }, []);

  const contextValues = {
    // varibales
    question,
    // actions
    enterClassRoom,
    sendQuestion,
    leaveClassRoom,
  };

  return (
    <SocketContext.Provider value={contextValues}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

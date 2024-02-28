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
  const URL = import.meta.env.VITE_SERVER_URL;

  const createClassRoom = async (info) => {
    const { classRoom, students } = info;
    students.forEach((student) => {
      addClass(classRoom, student);
    });
    addClass(classRoom, userInfo._id);
    const room = { roomId: classRoom, students, teacher: userInfo._id };
    try {
      const response = await axios.post(`${URL}/api/room/create`, room);
      if (response.status === 200) return console.log(response);
    } catch {
      (error) => {
        console.log(error);
      };
    }
  };

  const enterClassRoom = async (classId) => {
    socket_EnterRoom(classId);
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
    socket.on("entered_room", (classId) => console.log(classId));

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
    createClassRoom,
  };

  return (
    <SocketContext.Provider value={contextValues}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

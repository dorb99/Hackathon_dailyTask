import { useContext, useEffect, useState } from "react";
import "./userPage.css";
import { UserContext } from "../../components/userContext";
import { SocketContext } from "../../components/socketContext";
import CreateClass from "./createClassRoom";
import { useNavigate } from "react-router-dom";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

function UserPage() {
  const { userInfo, findAllQuestions, leftQuestions } = useContext(UserContext);
  const { createClassRoom, enterClassRoom } = useContext(SocketContext);
  const [createOption, setCreateOption] = useState(false);
  const [allClasses, setAllClasses] = useState();
  const [leftRooms, setLeftRooms] = useState([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(10);
  const navigate = useNavigate();

  const handleRoomClick = (index) => {
    const room = allClasses[index];
    enterClassRoom(room);
    if (leftRooms.includes(room)) {
      const index = leftRooms.indexOf(room);
      const question = leftQuestions[index];
      navigate("/questionPresentPage", { state: { question } });
    }
  };
  const handleSendQuestion = (index) => {
    const roomId = allClasses[index];
    navigate("/createQuestionPage", { state: { roomId } });
  };

  const handleShowStatus = (index) => {};

  const handleMoreOptions = (index) => {
    if (index === selectedClassIndex) setSelectedClassIndex(10);
    else setSelectedClassIndex(index);
  };
  const boldingTheLeft = () => {
    for (let index = 0; index < array.length; index++) {}
    if (index === selectedClassIndex) setSelectedClassIndex(10);
    else setSelectedClassIndex(index);
  };

  useEffect(
    () => {
      findAllQuestions();
      setAllClasses(userInfo?.classes);
      return () => {
        setAllClasses([]);
      };
    },
    [],
    [userInfo]
  );
  useEffect(() => {
    for (let i = 0; i < leftQuestions.length; i++) {
      const newLeftRoom = leftRooms;
      newLeftRoom[i] = leftQuestions[i].roomId;
      setLeftRooms(newLeftRoom);
    }
  }, []);
  return (
    <div className="page">
      <h2 className="header">Hi, {userInfo?.fullName}</h2>
      {userInfo?.role === "student" ? (
        <div className="maping_Container">
          {allClasses?.map((element, index) => (
            <button
              key={element}
              onClick={() => handleRoomClick(index)}
              className={`classBtn ${
                leftRooms.includes(element) ? "hasQuestion" : ""
              }`}
            >
              {element}
            </button>
          ))}
          {allClasses?.length === 0 && (
            <HourglassTopIcon
              className="my-icon"
              style={{ fontSize: "48px" }}
            />
          )}
        </div>
      ) : userInfo?.role === "teacher" ? (
        <div className="maping_Container">
          <button
            className="classBtn"
            onClick={() => setCreateOption(!createOption)}
          >
            Create classroom
          </button>

          {createOption ? (
            <CreateClass />
          ) : (
            allClasses?.map((element, index) => (
              <div className="classRoom" key={element}>

                <button
                  onClick={() => handleMoreOptions(index)}
                  className="classBtn"
                >
                  {element}
                </button>
                {selectedClassIndex === index && (
                  <div className="classDetails">
                    <button onClick={() => handleSendQuestion(index)}>
                      Send Question
                    </button>
                    <button onClick={() => handleShowStatus(index)}>
                      Check Status
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
          {allClasses?.length === 0 && (
            <HourglassTopIcon
              className="my-icon"
              style={{ fontSize: "48px" }}
            />

          )}
        </div>
      ) : null}
    </div>
  );
}

export default UserPage;

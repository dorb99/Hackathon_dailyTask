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
  const [showStatus, setShowStatus] = useState({ boolean: false, data: null });
  const [selectedClassIndex, setSelectedClassIndex] = useState(10);
  const navigate = useNavigate();
  const [helper, setHelper]= useState(false)

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

  const handleShowStatus = (index) => {
    const newStatus = showStatus;
    newStatus.boolean = !newStatus.boolean;
    newStatus.data = allClasses[index].students;
    setShowStatus(newStatus);
    console.log(newStatus);
  };

  const handleMoreOptions = (index) => {
    if (index === selectedClassIndex) setSelectedClassIndex(10);
    else setSelectedClassIndex(index);
  };

  useEffect(() => {
    setLeftRooms(prevLeftRooms => {
      const newLeftRooms = leftQuestions.map(question => question.roomId);
      return newLeftRooms;
    });
  }, [leftQuestions]);

  useEffect(
    () => {
      setHelper(!helper)
      findAllQuestions();
      setAllClasses(userInfo?.classes)
      return () => {
        // setAllClasses([]);
      };
    },
    [],[userInfo]
  );
  useEffect(() => {
    setLeftRooms(leftQuestions.map((question) => question.roomId));
  }, [leftQuestions]);

  return (
    <div className="page">
      <h2 className="header">Hi, {userInfo?.fullName}</h2>
      {userInfo?.role === "student" ? (
        <div className="classesContainer scroll">
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
        <>
          <button
            className="classBtn"
            onClick={() => setCreateOption(!createOption)}
          >
            Create classroom
          </button>
          {createOption ? (
            <CreateClass />
          ) : (

            <div className="classesContainer scroll">
              {allClasses?.map((element, index) => (
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
                      {!showStatus.boolean ? (
                        <button onClick={() => handleShowStatus(index)}>
                          Check Status
                        </button>
                      ) : (
                        <div>
                          {showStatus.boolean && <p>{showStatus.data}</p>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

          )}
          {allClasses?.length === 0 && (
            <HourglassTopIcon
              className="my-icon"
              style={{ fontSize: "48px" }}
            />
          )}
        </>
      ) : null}
    </div>
  );
}

export default UserPage;

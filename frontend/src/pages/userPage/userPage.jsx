import { useContext, useEffect, useState } from "react";
import "./userPage.css";
import { UserContext } from "../../components/userContext";
import { SocketContext } from "../../components/socketContext";
import CreateClass from "./createClassRoom";
import { useNavigate } from "react-router-dom";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function UserPage() {
  const { userInfo } = useContext(UserContext);
  const { createClassRoom, enterClassRoom } = useContext(SocketContext);
  const [createOption, setCreateOption] = useState(false);
  const [fullTable, setFullTable] = useState(false);
  const [allClasses, setAllClasses] = useState();
  const [selectedClassIndex, setSelectedClassIndex] = useState(false);
  const navigate = useNavigate();
  const roomId = "math12";

  const handleRoomClick = (index) => {
    enterClassRoom(allClasses[index]);
  };
  const handleSendQuestion = (index) => {
    navigate("/createQuestionPage");
  };
  const handleShowStatus = (index) => {};
  const handleCreateClassroom = (index) => {
    createClassRoom();
  };

  const handleMoreOptions =(params, isTrue)=>{
    setFullTable(isTrue);
    setSelectedClassIndex(params);
  }

  useEffect(() => {
    setAllClasses(userInfo?.classes);
    return () => {
      setAllClasses([]);
    };
  }, [userInfo]);

  return (
    <div className="page">
      <h2 className="header">Hi, {userInfo?.fullName}</h2>
      {userInfo?.role === "student" ? (
        <div className="maping_Container">
          {allClasses?.map((element, index) => (
            <button key={element} onClick={() => handleMoreOptions(index,!fullTable)}>
              {element}
            </button>
          ))}
          {allClasses?.length === 0 && (
                     <HourglassTopIcon className="my-icon" style={{ fontSize: '48px' }} />
          )}
        </div>
      ) : userInfo?.role === "teacher" ? (
        <div className="maping_Container">
          <button
            className="createOption"
            onClick={() => setCreateOption(!createOption)}
          >
            Create classroom
          </button>
          {createOption ? (
            <CreateClass roomId={roomId} />
          ) : (
            allClasses?.map((element, index) => (
              <div className="classRoom" key={element}>
                <button onClick={() => setFullTable(!fullTable)}>
                  {element}
                </button>
                {fullTable && (
                  <div>
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
        </div>
      ) : null}
    </div>
  );
}


export default UserPage;

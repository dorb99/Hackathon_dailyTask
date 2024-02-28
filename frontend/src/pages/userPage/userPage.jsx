import { useContext, useEffect, useState } from "react";
import "./userPage.css";

import { UserContext } from "../../components/userContext";
import { SocketContext } from "../../components/socketContext";

function UserPage() {
  const { userInfo, addClass } = useContext(UserContext);
  const { enterClassRoom } = useContext(SocketContext);
  const [classRoom, setClassRoom] = useState("");
  const [fullTable, setFullTable] = useState(false);
  const [allClasses, setAllClasses] = useState();

  const handleAddRoom = (e) => {
    e.preventDefault();
    addClass(classRoom);
  };
  const handleRoomClick = (index) => {
  };
  const handleSendQuestion = (index) => {
  };
  const handleShowStatus = (index) => {
  };

  useEffect(() => {
    setAllClasses(userInfo?.classes);
    console.log(allClasses);
    return () => {
      setAllClasses([]);
    };
  }, [userInfo]);

  return (
    <div className="page">
      <div className="Container">
        <h2 className="header">Hi, {userInfo?.fullName}</h2>
        <br />
        <br />
        <form className="addRoom" onSubmit={handleAddRoom}>
          <input
            type="text"
            required
            placeholder="Classroom"
            onChange={(e) => setClassRoom(e.target.value)}
          />
          <button type="submit">Enter New Classroom</button>
        </form>
      </div>
      <div className="rooms_Container">
        {userInfo?.role === "student"
          ? allClasses?.map((element, index) => (
              <button key={element} onClick={() => handleRoomClick(index)}>
                {element}
              </button>
            ))
          : userInfo?.role === "teacher"
          ? allClasses?.map((element, index) => (
              <div key={element}>
                <button onClick={() => setFullTable(true)}>{element}</button>
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
          : null}
      </div>
    </div>
  );
}

export default UserPage;

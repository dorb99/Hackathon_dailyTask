import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../components/socketContext";
import { UserContext } from "../../components/userContext";
import "./userPage.css";

function CreateClassRoom() {
  const [choosenStudents, setChoosenStudents] = useState([]);
  const [classRoom, setClassRoom] = useState("");
  const { createClassRoom } = useContext(SocketContext);
  const { allStudents, userInfo } = useContext(UserContext);

  const handleButtonClick = (index) => {
    setChoosenStudents((prevStudents) => {
      const studentId = allStudents[index]._id;
      if (prevStudents.includes(studentId)) {
        return prevStudents.filter((id) => id !== studentId);
      } else {
        return [...prevStudents, studentId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = { classRoom: classRoom, students: choosenStudents };
    createClassRoom(newRoom);
  };

  return (
    <form className="addRoom" onSubmit={handleSubmit}>
      <div className="button-room-form">
        {allStudents?.map((element, index) => (
          <div key={index}>
            <button
              type="button"
              className={`checkboxInput ${
                choosenStudents.includes(element._id) ? "active" : ""
              }`}
              id={index}
              onClick={() => handleButtonClick(index)}
            >
              {element.fullName}
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        required
        placeholder="Classroom"
        onChange={(e) => setClassRoom(e.target.value)}
      />
      <button type="submit">Enter New Classroom</button>
    </form>
  );
}

export default CreateClassRoom;

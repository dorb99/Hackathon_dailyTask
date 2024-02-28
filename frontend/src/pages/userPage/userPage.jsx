import { useContext, useState } from "react";
import "./userPage.css";

import { useLocation, useNavigate } from "react-router-dom";


function UserPage() {
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  const location = useLocation();
  const { info } = location.state;
  const { userInfo } = useContext(UserContext);

  const handleLogin = () => {
    navigate("/userHome");
  };
  console.log(info);
  return (
    <div className="page">
      <div className="login_Container">
        {/* <h2 className="header">Welcome!</h2>
        <p className="pBeforeForm">
          you can login here, or you can create a new user{" "}
          <span>right here</span>
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={userName}
            className="smallInput"
            placeholder="userName..."
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit" className="submitBtn">
            Login
          </button>
        </form> */}
        hello
      </div>
    </div>
  );
}

export default UserPage;

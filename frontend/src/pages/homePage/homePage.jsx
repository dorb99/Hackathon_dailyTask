import { useState } from "react";
import "./homePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/userHome");
  };
  const handleNewUser = () => {
    navigate("/signinPage");
  };

  return (
    <div className="page">
      <div className="login_Container">
        <h2 className="header">Welcome!</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            required
            value={userName}
            className="smallInput"
            placeholder="userName..."
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit" className="submitBtn">
            Login
          </button>
        </form>
        <p className="smallP">
          First time?{" "}
          <span className="linkSpan" onClick={handleNewUser}>
            create user
          </span>
        </p>
      </div>
    </div>
  );
}

export default HomePage;

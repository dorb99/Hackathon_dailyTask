import { useContext, useState } from "react";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/userContext";

function HomePage() {
  const [username, setUsername] = useState("");
  const { loginUserAction } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
     loginUserAction(username);
   

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
            value={username}
            className="smallInput"
            placeholder="username..."
            onChange={(e) => setUsername(e.target.value)}
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

import { Link,useNavigate } from "react-router-dom";
import "./navBar.css"; 
import { UserContext } from "../../components/userContext";
import { useContext } from "react";


const navbar = () => {
  const navigate = useNavigate();
  const { userInfo,logout } = useContext(UserContext);
 
  const handleClick = () => {
    logout();
    
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
      {(userInfo?.fullName) &&(
        <Link to="/userHome" className="navbar-logo">
         Daily tasks
        </Link>
      )} {!(userInfo?.fullName) &&(
        <Link to="/" className="navbar-logo">
         Daily tasks
        </Link>
      )}

        <div className="navbar-links">
        {(userInfo?.fullName) &&(
          <Link onClick={goBack} className="nav-link">
            Go back
          </Link>
        )}
          {(userInfo?.fullName) &&(
             <Link to="/" className="nav-link" onClick={()=>handleClick()}>
             Logout
           </Link>
          )}
         
          <Link to="/aboutUs" className="nav-link">
            About us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
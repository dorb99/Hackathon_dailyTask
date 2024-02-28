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
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
         Daily tasks
        </Link>

        <div className="navbar-links">
          <Link to="/userHome" className="nav-link">
            Home
          </Link>
          {(userInfo?.fullName) &&(
             <Link to="/" className="nav-link" onClick={()=>handleClick()}>
             Logout
           </Link>
          )}
         
          <Link to="/contact" className="nav-link">
            About us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
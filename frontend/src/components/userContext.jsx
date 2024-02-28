import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const URL = import.meta.env.VITE_SERVER_URL;

  const createUserAction = async (newUser) => {
    try {
      const response = await axios.post(`${URL}/api/user/create`, newUser);
      if (response.status === 402) return alert("username already in use");
      else if (response.status === 200) {
        console.log("User logged in, " + JSON.stringify(response.data));
        setUserInfo(JSON.stringify(response.data));
        navigate("/userHome");
      }
    } catch {
      (error) => {
        console.log(error);
      };
    }
  };

  const loginUserAction = async (username) => {
    try {
      const response = await axios.post(`${URL}/api/user/login`, { username });
      if (response.status === 403) {
        return alert("Username incorrect");
      } else if (response.status === 200) {
        console.log("User logged in, " + JSON.stringify(response.data));
        setUserInfo(JSON.stringify(response.data));
        navigate("/userHome");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  const contextValues = {
    // varibales
    userInfo,
    setUserInfo,

    // actions
    createUserAction,
    loginUserAction,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

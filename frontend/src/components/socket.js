
import { useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./userContext";

function Socket() {
  const { URL } = useContext(UserContext);
  const socket = io(URL);

  return socket;
}

export default Socket;
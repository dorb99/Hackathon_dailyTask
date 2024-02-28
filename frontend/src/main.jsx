import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/userContext.jsx";
import { SocketProvider } from "./components/socketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <SocketProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SocketProvider>
    </UserProvider>
  </BrowserRouter>
);

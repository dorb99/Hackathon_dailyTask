import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/userContext.jsx";
// import { CVProvider } from "./components/Tools/Context/CVContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      {/* <CVProvider> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
      {/* </CVProvider> */}
    </UserProvider>
  </BrowserRouter>
);

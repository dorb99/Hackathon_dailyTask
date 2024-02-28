import { io } from "socket.io-client";
import './App.css'

function App() {

  const socket = io.connect("http://localhost:3004");

  return (
    <>

      <div className="card">
        <div>
          hello world
        </div>
      </div>
      <p className="read-the-docs">
        maybe write some code and then enter...
      </p>
    </>
  )
}

export default App

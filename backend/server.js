const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const allQuestions = {};

dotenv.config({ path: "./.env" });
const DB = process.env.MONGODB_URL;
const URL = process.env.CLIENT_URL;
const PORT = process.env.SERVER_PORT;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log("problem: " + err));

const io = new Server(server, {
  cors: {
    origin: URL,
  },
});
const userRouets = require("./routes/userRoute");
const questionRouets = require("./routes/questionRoute");
const roomRouets = require("./routes/roomRoute");
app.use("/api/user", userRouets);
app.use("/api/question", questionRouets);
app.use("/api/room", roomRouets);

//liseners
io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);

  socket.on("enter_Room", (classId) => {
    socket.join(classId);
    socket.emit("entered_room", classId);
    console.log(allQuestions);
    if (allQuestions[classId]) {
      console.log("after");
      socket.to(classId).emit("latestQuestion", allQuestions[classId]);
    }
  });

  socket.on("send_Quesion", (info) => {
    const room = info.roomId;
    const question = info.question;
    allQuestions[room] = question;
    socket.to(room).emit("receivedQuestion", question);
  });
});

server.listen(PORT, () => {
  console.log("server listening on " + PORT);
});

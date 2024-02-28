const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
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

  socket.on("send_Quesion", (info) => {
    const room = info.room;
    const question = info.question;
    socket.to(room).emit(question);
  });

  socket.on("enter_Room", (classId) => {
    socket.join(classId);
    socket.to(socket.id).emit("entered_room", classId);
    if (allQuestions[classId]) {
      socket.to(classId).emit("latestQuestion", allQuestions[classId]);
    }
  });

  socket.on("send_Quesion", (info) => {
    const room = info.room;
    const question = info.question;
    allQuestions[room] = question;
    socket.to(room).emit(question);
  });
});

server.listen(PORT, () => {
  console.log("server listening on " + PORT);
});

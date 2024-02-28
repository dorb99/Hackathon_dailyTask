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
const userRouets = require('./routes/userRoute')
const questionRouets = require('./routes/questionRoute')
app.use('/api/user' , userRouets)
app.use('/api/question' , questionRouets)


io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
});

server.listen(PORT, () => {
  console.log("server listening on " + PORT);
});


module.exports = io;

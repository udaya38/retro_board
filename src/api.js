const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const serverless = require("serverless-http");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
app.use(cors());

const io = socketio(server, {
  path: "/socket.io",
  allowEIO3: true
});
io.set('transports', ['websocket']);
router.get("/", (req, res) => {
  res.send("Server is up and running");
});
app.use("/.netlify/functions/api", router);
server.listen(process.env.PORT || 3000);
io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("make-button-enabled", (value, room) => {
    io.to(room).emit("receive-make-button-enabled", value);
  });
  socket.on("make-blur", (value, room) => {
    io.to(room).emit("receive-make-blur", value);
  });
  socket.on("went-well", (value, room) => {
    io.to(room).emit("receive-went-well", value);
  });
  socket.on("to-improve", (value, room) => {
    io.to(room).emit("receive-to-improve", value);
    //socket.broadcast.emit('receive-to-improve',value)
  });
  socket.on("action-items", (value, room) => {
    // persistdata.data3=value;
    io.to(room).emit("receive-action-items", value);
  });
  socket.on("went-well-comment", (value, room) => {
    io.to(room).emit("receive-went-well-comment", value);
  });
});

module.exports.handler = serverless(app);

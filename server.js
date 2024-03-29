const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const middleware = require("./utils/authMiddleware");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();

const app = express();

const dbConnect = require("./utils/dbConnect");
dbConnect();

app.use(passport.initialize());
require("./utils/passport")(passport);

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
//api routes
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const { Server } = require("socket.io");
const { disconnect } = require("process");
const req = require("express/lib/request");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];
let usersSock = {};
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    // console.log(`user: ${user}`);
    const payload = await jwt.verify(token, process.env.SECRET);
    // console.log(payload);
    socket.userId = payload._id;
    next();
  } catch (err) {}
});
const usersApiRoute = require("./routes/api/users")(io);
const postsApiRoute = require("./routes/api/posts");

const conversationsApiRoute = require("./routes/api/conversations");

//api routes
app.use("/api/users", usersApiRoute);
app.use("/api/posts", postsApiRoute);

app.use("/api/conversations", conversationsApiRoute);

// utility functions

const addUser = (userId, socketId, user) => {
  console.log(userId, socketId, user);
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId, user: user });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getConnectedUser = (socketId) => {
  let user = users.filter((user) => user.socketId === socketId);

  return user[0];
};

io.on("connection", async (socket) => {
  // console.log(socket.handshake.query);
  let user = await User.findById(socket.userId).select("-password");
  // console.log(user._id);

  addUser(socket.userId, socket.id, user);
  let total = io.engine.clientsCount;
  console.log(total);

  socket.on("sayHello", (data) => {
    // console.log(data);
    let { socketId } = data;

    let user = getConnectedUser(socketId);

    console.log(user);
    io.to(socketId).emit(
      "recieveHello",
      `hello My name is ${user.user.username}`
    );
  });
  io.emit("connected", users);

  socket.on("disconnect", () => {
    let total = io.engine.clientsCount;
    console.log(total);
    removeUser(socket.id);
    console.log(`${socket.userId}  disconnected with socketID ${socket.id}`);
    io.emit("disconnected", users);
  });
  socket.on("disconnect", () => {
    let total = io.engine.clientsCount;
    // console.log(total);
    removeUser(socket.id);
    console.log(`${socket.userId}  disconnected with socketID ${socket.id}`);
    io.emit("disconnected", users);
  });
  socket.on("forcedDisconnect", () => {
    let total = io.engine.clientsCount;
    // console.log(total);
    removeUser(socket.id);

    console.log(`${socket.userId}  disconnected with socketID ${socket.id}`);
    socket.disconnect();
    io.emit("disconnected", users);
  });

  socket.on("userData", (data) => {
    io.to(data.socketId).emit("sendHello", `Hi ${data.userId}`);
  });
});
module.exports = app;

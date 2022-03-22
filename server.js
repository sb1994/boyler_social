const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");

const middleware = require("./utils/authMiddleware");
const cors = require("cors");

dotenv.config();

const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const usersApiRoute = require("./routes/api/users");
const postsApiRoute = require("./routes/api/posts");

const app = express();

const dbConnect = require("./utils/dbConnect");
dbConnect();

app.use(passport.initialize());
require("./utils/passport")(passport);

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes auth routes
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
//api routes
app.use("/api/users", usersApiRoute);
app.use("/api/posts", postsApiRoute);

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

//soket connection

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  io.emit("connected");

  socket.on("disconnect", () => {
    console.log("someone disconnected");
    io.emit("disconnected");
  });
});
module.exports = app;

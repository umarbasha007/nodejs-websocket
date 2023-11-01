// import { Server } from "socket.io";

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/home", (req, res) => {
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
// io.on("connection", (socket) => {
//   socket.broadcast.emit("chat message", "hi");
// });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

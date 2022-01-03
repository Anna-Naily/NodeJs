const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { connect } = require("http2");
let arrayUsers = [];
let countUsers = arrayUsers.length;

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);

  readStream.pipe(res);
});

const io = socket(server);

io.on("connection", client => {
  countUsers++;
  arrayUsers.push(`User${countUsers}`);
  const userName = arrayUsers[arrayUsers.length - 1];

  client.emit("connected", arrayUsers);

  client.on("disconnect", () => {
    for (let i = 0; i < arrayUsers.length; i++) {
      if (userName === arrayUsers[i]) arrayUsers.splice(i, 1);
    }
    client.broadcast.emit("user-leave", {
      userList: arrayUsers,
      msg: `Пользователь ${userName} отключился`,
    });
  });

  client.broadcast.emit("client-connection", {
    userList: arrayUsers,
    msg: `Пользователь ${userName} подключился`,
  });

  client.on("client-message", data => {
    const message = `${userName}: ${data.message}`;
    client.broadcast.emit("server-message", message);
    client.emit("server-message", message);
  });
});

server.listen(5000);

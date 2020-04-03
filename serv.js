const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const crypto = require("crypto");

const NumberGenerator = require("./src/NumberGenerator");
const Encryptor = require("./src/Encryptor");

app.use("/static", express.static("./static/"));
app.get("/", (req, res) => res.sendFile(__dirname + "/static/client.html"));
http.listen(3000, () => console.log("Listening 3000"));

let a = NumberGenerator.randomInteger(Number.MAX_VALUE / 10, 1.554835843e250);
let p = NumberGenerator.GetSimple();
let g = (p-1)/2;
let A = (g ^ a) % p;
let iv = crypto.randomBytes(8).toString('hex');

let Key;
//let ValidKey;
let Apg = {
  A: A,
  p: p,
  g: g,
  iv: iv
};

console.log(Apg);

io.on("connection", socket => {
  console.log(`${socket.client.id} has been connected`); //лог подключения

  socket.on("greetingToServ", () => {
    //Обмен ключами между клиентом и сервером
    socket.emit("greetingToClient", Apg);
  });
  socket.on("sayBack", B => {
    Key = (B ^ a) % p;
    //ValidKey = NumberGenerator.MakeValidKey(Key);  
    console.log(`KEY ${Key}`);
  });

  socket.on("chat mes", Message => {
    console.log(Message);
    socket.broadcast.emit("chat message", {
      name: Message.name,
      msg: Message.msg
    });
    // users.forEach(item => {
    //   socket.broadcast
    //     .to(item.id)
    //     .emit("chat message", { name: Message.name, msg: decMes });
    // });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.client.id} disconnected`);
    // users.splice(users.indexOf(users.find(item => item.id === socket.client.id)),1);
  }); //лог отключения
});

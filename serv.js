"use strict";
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

//Комментарии по методичке БПтД
let Q = NumberGenerator.GetSimple(); 
let A = NumberGenerator.Proot(Q) //Примитивный корень
// let Q = 13;
// let A = 2;
let Xb = NumberGenerator.randomInteger(1, Q);
let Yb = (A**Xb)%Q;
let Key;

let iv = crypto.randomBytes(8).toString("hex");

let Apg = {
  A:A,
  Q:Q,
  Yb: Yb,
  iv: iv,
};
console.log(Apg);

let users = [];

io.on("connection", (socket) => {
  console.log(`${socket.client.id} has been connected`); //лог подключения
  socket.on("greetingToServ", () => {

    //Обмен ключами между клиентом и сервером
    socket.emit("greetingToClient", Apg);
  });

  socket.on("sayBack", (Yc) => {
    Key = (Yc**Xb)%Q;
    console.log(`KEY =  ${Key}`);
    users.push({id: socket.client.id,key:Key, validKey:NumberGenerator.MakeValidKey(Key)});

    console.log(users);
  });

  socket.on("chat mes", (Message) => {
    let decMes = Encryptor.decrypt(Message.msg,users.find(item => item.id === socket.client.id).validKey,iv);
    console.log(Message);
    users.forEach(item => {
      socket.broadcast.to(item.id).emit('chat message',{name:Message.name, msg: Encryptor.encrypt(decMes,item.validKey,iv) });
  });  
    // socket.emit("chat message", {
    //   name: Message.name,
    //   msg: Message.msg,
    // });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.client.id} disconnected`);
     users.splice(users.indexOf(users.find(item => item.id === socket.client.id)),1);
  }); //лог отключения
});

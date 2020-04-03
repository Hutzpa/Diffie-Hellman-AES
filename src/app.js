var $ = require("jquery");
var socket = io();
const NumberGenerator = require("./NumberGenerator");
const Encryptor = require("./Encryptor");

// source https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB_%D0%94%D0%B8%D1%84%D1%84%D0%B8_%E2%80%94_%D0%A5%D0%B5%D0%BB%D0%BB%D0%BC%D0%B0%D0%BD%D0%B0
let b = NumberGenerator.randomInteger(Number.MAX_VALUE / 10, 1.554835843e250);
let B;
let Key;
let ValidKey;
let iv;



socket.emit("greetingToServ");
socket.on("greetingToClient", Apg => {
  console.log(Apg);
  B = (Apg.g ^ b) % Apg.p;
  Key = (Apg.A ^ b) % Apg.p;
  iv = Apg.iv;
  socket.emit("sayBack", B);
  
  console.log(`KEY ${Key}`);
  ValidKey = NumberGenerator.MakeValidKey(Key);
  console.log(`Valid Key ${ValidKey}`);

});

$("form").submit(e => {
  e.preventDefault();
  socket.emit("chat mes", {
    name: $("#name").val(),
    msg: Encryptor.encrypt($("#message").val(), ValidKey, iv)
  }); //Отправка сообщений на сервер
  $("#all_mess").append(
    `<div class='alert'> <b> ${$("#name").val()} </b> : ${$(
      "#message"
    ).val()} </div>`
  );
  $("#message").val("");
  return false;
});

socket.on("chat message", Message => {
  $("#all_mess").append(
    `<div class='alert'> <b>${Message.name} </b> : ${Encryptor.decrypt(
      Message.msg,
      ValidKey,
      iv
    )} </div>`
  );
});

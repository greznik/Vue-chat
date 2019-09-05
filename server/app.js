const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  socket.on("joinUser", (data, payload) => {
    if (!data.name || !data.room) {
      return payload("Неккоректные данные");
    }

    socket.join(data.room);

    payload({ userId: socket.id });
    socket.emit("newMessage", m("admin", `${data.name}, вошел в чат.`));
    socket.emit("newMessage", m("test", `вы вошли в чат.`));

    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `Пользователь ${data.name} зашел.`));
  });

  socket.on("createMessage", data => {
    setTimeout(() => {
      socket.emit("newMessage", {
        text: data.text + " SERVER"
      });
    }, 1000);
  });
});

module.exports = {
  app,
  server
};

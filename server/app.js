const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = require("./users")();

const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  socket.on("joinUser", (data, payload) => {
    if (!data.name || !data.room) {
      return payload("Неккоректные данные");
    }

    socket.join(data.room);

    users.remove(socket.id);
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });

    payload({ userId: socket.id });
    io.to(data.room).emit("updateUsers", users.getByRoom(data.room));
    socket.emit("newMessage", m("admin", `${data.name}, вошел в чат.`));

    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `Пользователь ${data.name} зашел.`));
  });

  socket.on("createMessage", (data, payload) => {
    if (!data.text) {
      return payload("Сообщение не должно быть пустым");
    }
    const user = users.get(data.id);
    if (user) {
      io.to(user.room).emit("newMessage", m(user.name, data.text, data.id));
    }
    payload();
  });

  socket.on("userLeft", (id, payload) => {
    const user = users.remove(id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        m("admin", `Пользователь ${user.name} вышел.`)
      );
    }
    payload();
  });

  socket.on("disconnect", () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        m("admin", `Пользователь ${user.name} вышел.`)
      );
    }
  });
});

module.exports = {
  app,
  server
};

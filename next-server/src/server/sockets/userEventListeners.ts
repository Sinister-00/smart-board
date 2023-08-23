import {SOCKET_EVENTS, SocketServer} from "../../entities/socket";

const userEventsListeners = (socket: SocketServer) => {
  socket.on(SOCKET_EVENTS.MOUNT_USERNAME, (username) => {
    socket.data.username = username;
  })

  socket.on(SOCKET_EVENTS.GET_USERNAME, (callBack) => {
    if (socket.data.username) {
      callBack(socket.data.username);
    } else {
      callBack("Error");
    }
  })

  socket.on(SOCKET_EVENTS.OPPONENT_LEFT, () => {
    socket.leave(socket.data.roomid!);
    socket.data.roomid = null;
  });

  socket.on(SOCKET_EVENTS.MAKE_MOVE, (data: any) => {
    socket.to(socket.data.roomid!).emit(SOCKET_EVENTS.MOVE, data);
  });

  socket.on(SOCKET_EVENTS.LOGOUT, () => {
    socket.disconnect(false);
  })
};

export default userEventsListeners
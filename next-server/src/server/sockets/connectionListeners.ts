import {SOCKET_EVENTS, SocketServer} from "../../entities/socket";

const connectionListeners = (socket: SocketServer) => {
  socket.conn.once("upgrade", () => {
    console.log(`Upgraded transport:${socket.conn.transport.name}`)
  });

  socket.on(SOCKET_EVENTS.PING, (callbackFn: (response: string) => void) => {
    try {
      callbackFn('pong');
    } catch (err) {
      console.log(err);
      callbackFn('bad ping');
    }

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      if (socket.data.roomid) {
        socket.to(socket.data.roomid).emit(SOCKET_EVENTS.OPPONENT_LEFT)
        socket.leave(socket.data.roomid);
        socket.data.roomid = null;
      }
      console.log(`Socket Disconnected:${socket.id}`);
    })

    socket.conn.on("close", (reason) => {
      console.log(`Connection closed:${reason}`)
    });
  });
}

export default connectionListeners
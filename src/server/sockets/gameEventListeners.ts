import {SOCKET_EVENTS, SocketServer} from "../../entities/socket";

const gameEventListeners = (socket: SocketServer) => {
  socket.on(SOCKET_EVENTS.CREATE_ROOM, (callbackFn: (response: string | number) => void) => {
    try {
      if (socket.data.roomid) {
        callbackFn('inroom');
      } else {
        const roomid = new Date().getTime().toString(); // TODO: Verify toString()
        socket.join(roomid.toString());
        socket.data.roomid = roomid;
        console.log('\x1b[36m', `${socket.data.username} created ${socket.data.roomid}`);
        callbackFn(socket.data.roomid);
      }
    } catch (error) {
      console.log(error);
      callbackFn('Error');
    }
  });

  socket.on(SOCKET_EVENTS.JOIN_ROOM, (data: string, userData: any, callbackFn: (response: string | number) => void) => {
    try {
      if (socket.rooms.has(data)) {
        if (socket.rooms.size === 1) {
          callbackFn(data);
          socket.join(data.toString());
          socket.data.roomid = data;
          socket.to(socket.data.roomid).emit(SOCKET_EVENTS.OPPONENT_DATA, userData);
          console.log('\x1b[36m', `${socket.data.username} joined ${socket.data.roomid}`);
        } else {
          callbackFn('full');
        }
        console.log();
      } else {
        callbackFn('no room');
      }
    } catch (error) {
      console.log(error);
      callbackFn('Error');
    }
  });

  socket.on(SOCKET_EVENTS.START_GAME, (data: object) => {
    socket.to(socket.data.roomid!).emit(SOCKET_EVENTS.OPPONENT_DATA, data);
    socket.to(socket.data.roomid!).emit(SOCKET_EVENTS.GAME_STARTED, data);
  });

  socket.on(SOCKET_EVENTS.DELETE_ROOM, (callbackFn: (response: string) => void) => {
    try {
      if (socket.data.roomid) {
        console.log('\x1b[33m', `${socket.data.username} deleted ${socket.data.roomid}`);
        socket.to(socket.data.roomid).emit(SOCKET_EVENTS.OPPONENT_LEFT);
        callbackFn('deleted');
      } else {
        callbackFn('noroom');
      }
    } catch (error) {
      console.log(error);
      callbackFn('Error');
    }
  });

  socket.on(SOCKET_EVENTS.LEAVE_GAME, (callbackFn: (response: string) => void) => {
    if (socket.data.roomid) {
      socket.to(socket.data.roomid).emit(SOCKET_EVENTS.OPPONENT_LEFT);
      socket.leave(socket.data.roomid);
      socket.data.roomid = null;
      callbackFn('left');
    } else {
      callbackFn('error');
    }
  });

  socket.on(SOCKET_EVENTS.GAME_OVER, () => {
    socket.leave(socket.data.roomid!);
    socket.data.roomid = null;
  });
}

export default gameEventListeners
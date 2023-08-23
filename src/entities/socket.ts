import {Socket} from "socket.io";

export type ClientToServerEvents = {
  hello: () => void;
  // Custom Events
  [SOCKET_EVENTS.MOUNT_USERNAME]: (username: string) => void;
  [SOCKET_EVENTS.GET_USERNAME]: (callBack: (username: string) => void) => void;
  [SOCKET_EVENTS.LOGOUT]: () => void;
  [SOCKET_EVENTS.GAME_OVER]: () => void;
  [SOCKET_EVENTS.PING]: (callbackFn: (response: string) => void) => void;
  [SOCKET_EVENTS.CREATE_ROOM]: (callbackFn: (response: string | number) => void) => void;
  [SOCKET_EVENTS.JOIN_ROOM]: (
    roomID: string,
    userData: any,
    callbackFn: (response: string | number) => void
  ) => void;
  [SOCKET_EVENTS.OPPONENT_LEFT]: () => void;
  [SOCKET_EVENTS.OPPONENT_DATA]: (userData: any) => void;
  [SOCKET_EVENTS.GAME_STARTED]: (data: any) => void;
  [SOCKET_EVENTS.START_GAME]: (data: any) => void;
  [SOCKET_EVENTS.MAKE_MOVE]: (data: any) => void;
  [SOCKET_EVENTS.DELETE_ROOM]: (callbackFn: (response: string) => void) => void
  [SOCKET_EVENTS.LEAVE_GAME]: (callbackFn: (response: string) => void) => void
};

export type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  // Custom Events
  [SOCKET_EVENTS.OPPONENT_LEFT]: () => void;
  [SOCKET_EVENTS.OPPONENT_DATA]: (userData: any) => void;
  [SOCKET_EVENTS.GAME_STARTED]: (data: any) => void;
  [SOCKET_EVENTS.MOVE]: any // TODO: Fix
};

export type InterServerEvents = {
  ping: () => void;
};

export type SocketData = {
  name: string;
  age: number;
  roomid: string | null;
  username: string;
};

export enum SOCKET_EVENTS {
  MOUNT_USERNAME = 'mount-username',
  GET_USERNAME = 'get-username',
  LOGOUT = 'logout',
  OPPONENT_LEFT = 'opponent-left',
  DISCONNECT = 'disconnect',
  PING = 'ping',
  CREATE_ROOM = 'create-room',
  JOIN_ROOM = 'join-room',
  OPPONENT_DATA = 'opponent-data',
  GAME_STARTED = 'game-started',
  DELETE_ROOM = 'delete-room',
  START_GAME = 'start-game',
  LEAVE_GAME = 'leave-game',
  GAME_OVER = 'game-over',
  MAKE_MOVE = 'make-move',
  MOVE = 'move',
}

export type SocketServer = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

import {SocketServer} from "@server/entities/socket";
import userEventsListeners from "./userEventListeners";
import connectionListeners from "./connectionListeners";
import gameEventListeners from "./gameEventListeners";

export default (socket: SocketServer) => {
  userEventsListeners(socket)
  connectionListeners(socket)
  gameEventListeners(socket)
};

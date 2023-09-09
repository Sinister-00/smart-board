import cookieParser from 'cookie-parser'

// ts not working

import next from 'next'
import http from 'http'
import cors from 'cors';
import express from 'express'
import {Server, ServerOptions} from 'socket.io'
import handleSocketConnections from './sockets/index'
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from '@server/entities/socket'

const app = express()
const dev = process.env.ENV === 'local'
const port = +(process.env.PORT || 3000)
const httpServer = http.createServer(app);
const nextApp = next({dev, hostname: 'localhost', port, httpServer})
const nextHandle = nextApp.getRequestHandler()

app.use(cors());
app.use(cookieParser())

//  =============== Socket Configurations ===============
const socketOpts: Partial<ServerOptions> = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
}

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, socketOpts)

const environment = process.env.env || 'dev'; // Replace 'dev' with your default environment

nextApp.prepare().then(() => {
  //  =============== Socket Connection ===============
  io.on("connection", (socket) => {
    console.log(`New Socket Connection:${socket.id}`);
    handleSocketConnections(socket);
  })

  //  =============== Next JS Routes ===============
  app.get('*', (req, res) => {
    return nextHandle(req, res)
  })

  httpServer.listen(port, () => console.log(`Server started on ${port}`))
})

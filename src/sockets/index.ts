import { Server } from 'socket.io'

import { verifySocketJWT } from './auth.middleware.js'
import { registerPresenceHandlers } from './presence.handler.js'

export const configureSockets = (io: Server) => {
  io.use(verifySocketJWT)

  io.on('connection', (socket) => {
    registerPresenceHandlers(io, socket)
    // Add other event listeners here (chat, typing, etc.)
  })
}

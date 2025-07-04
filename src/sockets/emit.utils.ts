import { Server } from 'socket.io'

import { onlineUsers } from './onlineUsers.js'

export const emitToUser = (io: Server, userId: string, event: string, payload: any) => {
  const socketId = onlineUsers.get(userId)
  if (socketId) {
    io.to(socketId).emit(event, payload)
  }
}

export const emitToRoom = (io: Server, room: string, event: string, payload: any) => {
  io.to(room).emit(event, payload)
}

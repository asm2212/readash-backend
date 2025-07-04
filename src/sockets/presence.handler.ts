import { Server, Socket } from 'socket.io'

import User from '../models/User.js'

import { onlineUsers } from './onlineUsers.js'

export const registerPresenceHandlers = (io: Server, socket: Socket) => {
  const userId = socket.data.user.id
  onlineUsers.set(userId, socket.id)

  socket.broadcast.emit('user_online', { userId })

  User.findByIdAndUpdate(userId, {
    socketId: socket.id,
    lastActive: new Date(),
  }).catch(console.error)

  io.emit('online_users', Array.from(onlineUsers.keys()))

  socket.on('disconnect', async () => {
    onlineUsers.delete(userId)
    await User.findByIdAndUpdate(userId, {
      socketId: null,
      lastActive: new Date(),
    })
    socket.broadcast.emit('user_offline', { userId })
  })
}

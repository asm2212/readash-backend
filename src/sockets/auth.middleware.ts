import jwt from 'jsonwebtoken'
import { Socket } from 'socket.io'

export const verifySocketJWT = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token
  if (!token) return next(new Error('No token provided'))

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!)
    socket.data.user = user
    next()
  } catch {
    next(new Error('Invalid or expired token'))
  }
}

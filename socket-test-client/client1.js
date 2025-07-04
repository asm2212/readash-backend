/* eslint-env node */

import { io } from 'socket.io-client'
import dotenv from 'dotenv'

dotenv.config()

const socket = io('http://localhost:5000', {
  auth: {
    token: process.env.JWT,
  },
  transports: ['websocket'], // ensure it uses WebSocket directly
})

socket.on('connect', () => {
  console.log('✅ Connected to server. Socket ID:', socket.id)
})

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server')
})

socket.on('user_online', (data) => {
  console.log('🟢 User Online:', data.userId)
})

socket.on('user_offline', (data) => {
  console.log('🔴 User Offline:', data.userId)
})

socket.on('online_users', (userIds) => {
  console.log('👥 Online Users:', userIds)
})

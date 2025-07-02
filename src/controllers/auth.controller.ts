import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body // Add role to destructuring

  if (!name || !email || !password) {
    res.status(400).json({ message: 'All fields required' })
    return
  }

  // Validate role if provided
  const validRoles = ['user', 'admin']
  const userRole = validRoles.includes(role) ? role : 'user'

  const existing = await User.findOne({ email })
  if (existing) {
    res.status(409).json({ message: 'Email already registered' })
    return
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email,
    password: hashed,
    role: userRole, // Use the validated role
  })

  res.status(201).json({
    message: `User registered as ${userRole}`,
    user: { id: user._id, email, role: user.role },
  })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1h',
    },
  )

  res.status(200).json({
    message: 'Login successful',
    token,
    user: { id: user._id, role: user.role },
  })
}

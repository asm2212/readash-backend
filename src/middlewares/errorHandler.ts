import { Request, Response } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error('🔥 Error:', err.message)
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  })
}

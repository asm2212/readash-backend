import { Router } from 'express'

import { allowRoles, verifyToken } from '../middlewares/auth.js'

const router = Router()

router.get('/admin', verifyToken, allowRoles('admin'), (req, res) => {
  res.json({ message: 'Admin route accessible' })
})

export default router

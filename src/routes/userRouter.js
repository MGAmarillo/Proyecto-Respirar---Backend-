import express from 'express'
import { body, validationResult } from 'express-validator'
import { login } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/login', body('username').isEmail(),
  body('password').isString(),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const token = await login(req.body.username, req.body.password)
      res.send({ token })
    } catch (error) {
      res.status(401).send(error.message)
    }
  })

export { userRouter }

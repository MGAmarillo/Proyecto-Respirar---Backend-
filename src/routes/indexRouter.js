import express from 'express'

const indexRouter = express.Router()

indexRouter.get('/', (req, res, next) => {
  res.json({ title: 'Respirar Backend' })
})

export { indexRouter }

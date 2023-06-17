import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  if (!req.header('Authorization')) {
    res.status(401).send({ err: 'Header de autorización inexistente' })
  } else {
    const token = req.header('Authorization').replace('Bearer ', '')
    try {
      const user = jwt.verify(token, 'unaclavesupersecreta')
      next()
    } catch (error) {
      res.status(401).send({ err: error.message })
    }
  }
}

const getUser = (req) => {
  if (!req.header('Authorization')) {
    return undefined
  }

  const token = req.header('Authorization').replace('Bearer ', '')
  return jwt.verify(token, 'unaclavesupersecreta')
}

export { auth, getUser }

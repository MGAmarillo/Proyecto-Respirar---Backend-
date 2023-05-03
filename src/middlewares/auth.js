import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  if (!req.header('Authorization')) {
    res.status(401).send({ err: 'Header de autorización inexistente' })
  } else {
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log(token)
    try {
      const user = jwt.verify(token, 'unaclavesupersecreta')
      console.log(user)
      next()
    } catch (error) {
      res.status(401).send({ err: error.message })
    }
  }
}

export { auth }

import jwt from 'jsonwebtoken'

const generateToken = async (user) => {
  return await jwt.sign({ id: user.id }, 'unaclavesupersecreta', { expiresIn: '24h' })
}

export { generateToken }

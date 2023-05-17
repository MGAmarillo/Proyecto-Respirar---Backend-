import jwt from 'jsonwebtoken'

const generateToken = async (user) => {
  console.log("user en jwt")
  console.log(user)
  return await jwt.sign({ _id: user.username }, 'unaclavesupersecreta', { expiresIn: '24h' })
}

export { generateToken }

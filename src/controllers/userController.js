import { generateToken } from '../domain/jwtGenerator.js'
import { findByUsername } from '../domain/fakeUserDB.js'
import bcrypt from 'bcrypt'

const login = async (username, password) => {
  const user = await findByUsername(username)
  if (!user) {
    throw new Error('Credenciales no validas')
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Credenciales no validas')
  }
  const token = await generateToken(user)

  return {
    username, token
  }
}

export { login }

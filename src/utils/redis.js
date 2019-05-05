import client, { getAsync } from '../core/redis'
import crypto from 'crypto'
const expiry = new Date().setHours(24)

//TODO: Generate an md5 hash with userid and password
export const generateKey = (user) => {
  return crypto.createHash('md5').update(`${user.id}${user.password}`).digest('hex')
}

export const setUserRedis = (user, data) => {
  client.setex(generateKey(user), expiry, data)
}

export const getUserRedis = async (user) => {
  try {
    return await getAsync(generateKey(user))
  } catch (e) {
    return null
  } 
}

import client, { getAsync } from '../core/redis'
import crypto from 'crypto'
const expiry = new Date().setHours(24)

const generateUserKey = (user) => {
  return `user/${crypto.createHash('md5').update(`${user.id}${user.password}`).digest('hex')}`
}

export const setUserRedis = (user, data) => {
  client.set(generateUserKey(user), JSON.stringify(data), 'EX', expiry)
}

export const getUserRedis = async (user) => {
  try {
    const data = await getAsync(generateUserKey(user))
    return JSON.parse(data)
  } catch (e) {
    return null
  } 
}

import client, { getAsync } from '../core/redis'
const expiry = new Date().setHours(24)

//TODO: Generate an md5 hash with userid and password
const generateKey = (user) => {
  return user.id
}

export const setUserRedis = (user, data) => {
  client.setex(generateKey(user), expiry, data)
}

export const getUserRedis = async (user) => {
  try {
    return await getAsync(user)
  } catch (e) {
    return null
  } 
}

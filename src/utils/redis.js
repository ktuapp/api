import client, { getAsync, lrangeAsync } from '../core/redis'
import crypto from 'crypto'
import { sendNotification } from '../core/firebase'
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

export const saveNotifications = async (notifications) => {
  try {
    const existingNotifications = await getNotifications()
    const newNotifications = notifications
      .filter((n) => (existingNotifications.filter(en => en.key === n.key).length === 0))
      .map((n) => (JSON.stringify(n)))
    if(newNotifications.length > 0) {
      client.rpush('notifications', newNotifications)
      newNotifications.map((n)=>sendNotification(n, 'ktu_notification'))
    }
  } catch (e) {
    console.log(e)
  }
}

export const getNotifications = async () => {
  const data = await lrangeAsync('notifications', 0, -1)
  return data.map((n)=>JSON.parse(n))
}

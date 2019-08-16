/* eslint-disable no-console */
import { getNotifications } from '../utils/redis'

const showNotifications = async (req, res) => {
  try {
    const data = await getNotifications()
    res.json({ notifications: data })
  } catch (err) {
    console.error(err)
  }
}

export default showNotifications

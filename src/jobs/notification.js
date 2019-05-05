import rp from 'request-promise'
import cheerio from 'cheerio'
import parseNotifications from '../utils/parseNotifications.js'
import { saveNotifications } from '../utils/redis'

const fetchNotifications = async () => {
  const options = {
    uri: 'https://ktu.edu.in/eu/core/announcements.htm',
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  try {
    const response = await rp(options)
    const notifications = parseNotifications(response)
    saveNotifications(notifications)
  } catch (e) {
    console.error(e)
  }
}

export default fetchNotifications

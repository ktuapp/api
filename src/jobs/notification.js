import rp from 'request-promise'
import cheerio from 'cheerio'
import parseNotifications from '../utils/parseNotifications.js'
import { saveNotifications } from '../utils/redis'

const fetchNotifications = async () => {
  console.log("Fetching Notifications");
  
  const options = {
    uri: 'https://ktu.edu.in/eu/core/announcements.htm',
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  try {
    const response = await rp(options)
    const notifications = parseNotifications(response)
    console.log("Fetching Notifications", notifications)
    saveNotifications(notifications)
  } catch (e) {
    console.error(e)
  }
}

export default fetchNotifications

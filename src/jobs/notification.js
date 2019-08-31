import rp from 'request-promise'
import cheerio from 'cheerio'
import { parseNotifications } from '../utils/notifications.js'
import { saveNotifications } from '../utils/redis'
import { sendMessage } from '../core/slack.js'

const fetchNotifications = async () => {
  sendMessage('Fetching Notifications')
  
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

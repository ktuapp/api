import slugify from './slugify'
import { sendNotification } from '../core/firebase'
import { sendMessage } from '../core/slack'

export const parseNotifications = ($) => {
  let notificationArray = []
  let j = 0
  let notification = {}
  $('td')
    .slice(0, 20)
    .each(function () {
      $(this)
        .children()
        .each((i, elem) => {
          switch (j) {
            case 0:
              if (i === 0) {
                let value = $(elem).text()
                value = value.replace(/\t/g, '')
                value = value.replace(/\n/g, '')
                value = value.replace(/ {2}/g, '')
                notification.date = value
                j = 1
              }
              break
            case 1:
              if (i === 0) {
                const dataElem = $(elem).children().first()
                notification.heading = $(dataElem).children().first().text()
                notification.key = slugify(notification.heading)
                let value = $(dataElem).clone().children().remove().end().text()
                value = value.replace(/\t/g, '')
                value = value.replace(/\n/g, '')
                value = value.replace('Results', '')
                value = value.replace('Notification', '')
                value = value.replace(notification.heading, '')
                value = value.replace(/ {2}/g, '')
                notification.data = value
                notificationArray.push(notification)
                notification = {}
                j = 0
              }
              break
          }
        })
    })
  return notificationArray
}

export const sendNewNotifications = (notifications) => {
  notifications.forEach((n) => {
    sendMessage(JSON.stringify(n))
    sendNotification(cleanNotificationForFirebase(n))
  })
}

export const cleanNotificationForFirebase = (notification) => {
  const n = JSON.parse(notification)
  return {
    data: {
      ...n,
      click_action: 'FLUTTER_NOTIFICATION_CLICK'
    },
    notification: {
      title: n.heading,
      body: n.data.substring(0, 100).concat('...')
    },
    topic: 'ktu_notification'
  }
}

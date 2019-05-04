import rp from 'request-promise'
import cheerio from 'cheerio'

const getNotifications = (req, res) => {
  var options = {
    uri: 'https://ktu.edu.in/eu/core/announcements.htm',
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  let NotificationArray = []
  rp(options)
    .then(function ($) {
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
                  let value = $(elem).text()
                  value = value.replace(/\t/g, '')
                  value = value.replace(/\n/g, '')
                  value = value.replace(/ {2}/g, '')
                  notification.data = value
                  NotificationArray.push(notification)
                  notification = {}
                  j = 0
                }
                break
              }
            })
        })
      res.json({ notifications: NotificationArray })
    })
    .catch(function (err) {
      console.error(err)
    })
}

export default getNotifications

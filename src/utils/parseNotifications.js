export default ($) => {
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
              let value = $(elem).text()
              value = value.replace(/\t/g, '')
              value = value.replace(/\n/g, '')
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

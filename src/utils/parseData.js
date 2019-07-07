import Path from 'path'
import fs from 'fs'
import request from 'request'

const parseData = ($, cookieJar) => {
  let name = $('.profile-title').text()
  let proimg = $('.card-bkimg').attr('src')
  let username = name.substring(0, name.indexOf('('))
  let userid = name.substring(name.indexOf('(') + 1, name.indexOf(')'))
  const data = {}
  data.username = username
  data.userid = userid
  let proimgurl = 'http://app.ktu.edu.in' + proimg
  getImg(proimgurl, cookieJar, userid)
  data.proimg = process.env.IMAGE_URL + userid + '.jpg'
  $('.list-group-item').each(function () {
    $(this)
      .children()
      .each(function (i, elem) {
        try {
          if (elem.next != null) {
            let value = elem.next.data
            value = value.replace(/\t/g, '')
            value = value.replace(/\n/g, '')
            value = value.replace(/ {2}/g, '')
            let title = $(this).text()
            title = title.replace(/\s+/g, '')
            data[title] = value
          }
        } catch (e) {
          console.error(e)
        }
      })
  })

  for (let k = 1; k <= 8; k++) {
    let S = []
    let sgpa = 0
    $(`#collapseFiveS${k} .table tr`).each(function () {
      let j = 0
      let dataRow = {}
      $(this)
        .children()
        .each(function (i, elem) {
          switch (j) {
          case 0:
            dataRow.slot = $(elem).text()
            break
          case 1:
            dataRow.course = $(elem).text()
            break
          case 2:
            dataRow.credit = $(elem).text()
            break
          case 3:
            dataRow.type = $(elem).text()
            break
          case 4:
            dataRow.completed = $(elem).text().replace(/[\t\n\s]/g, '')
            break
          case 6:
            dataRow.grade = $(elem).text()
            break
          case 7:
            dataRow.earned = $(elem).text()
            break
          case 8:
            sgpa = $(elem).text()
            break
          }
          j++
        })
      S.push(dataRow)
    })

    data[`S${k}`] = S
    data[`S${k}sgpa`] = sgpa
  }
  data.DateofAdmission = data.DateofAdmission.replace(
    data.DateofAdmission.substring(11, 24),
    ''
  )
  data.DateofAdmission = data.DateofAdmission.replace(
    data.DateofAdmission.substring(0, 4),
    ''
  )

  return data
}

const getImg = (url, cookieJar, userid) => {
  if (userid) {
    const path = Path.resolve(process.env.IMAGE_PATH, 'proimg', userid + '.jpg')
    request({
      uri: url,
      jar: cookieJar,
      resolveWithFullResponse: true
    }).pipe(fs.createWriteStream(path))
  }
}

export default parseData

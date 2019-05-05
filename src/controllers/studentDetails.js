/* eslint-disable no-console */
import request from 'request'
import cheerio from 'cheerio'
import rp from 'request-promise'
import parseData from '../utils/parseData'

const getDetails = (res, cookieJar) => {
  return new Promise((resolve) => {
    if (res.statusCode === 200) {
      resolve(parseData(cheerio.load(res.body), cookieJar))
    }
  })
}

const getStudentDetails = async (req, res) => {
  let csrf = await getCSRFToken()
  let options = {
    method: 'POST',
    uri: 'https://app.ktu.edu.in/login.jsp',
    simple: false,
    jar: csrf.jar,
    form: {
      CSRF_TOKEN: csrf.token,
      username: req.body.userid,
      password: req.body.password
    },
    // headers: {
    //   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    //   'cache-control': 'no-cache',
    //   'content-type': 'application/x-www-form-urlencoded',
    //   'connection': 'keep-alive',
    //   'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:64.0) Gecko/20100101 Firefox/64.0' },
    headers: {
      'user-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:64.0) Gecko/20100101 Firefox/64.0',
      'content-Type': 'application/x-www-form-urlencoded'
    },
    followAllRedirects: true,
    resolveWithFullResponse: true
  }
  try {
    let response = await rp(options)
    let data = await getDetails(response, csrf.jar)
    res.json(data)
  } catch (e) {
    console.log(e)
    res.status(403).send({ status: 'error' })
  }
}

const getCSRFToken = () => {
  var j = request.jar()
  return new Promise((resolve, reject) => {
    var options = {
      uri: 'https://app.ktu.edu.in/login.jsp',
      jar: j,
      transform: function (body) {
        return cheerio.load(body)
      }
    }
    rp(options)
      .then(function ($) {
        let token = $('input[name="CSRF_TOKEN"]').val()
        resolve({ token: token, jar: j })
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

export default getStudentDetails

/* eslint-disable no-console */
import request from 'request'
import cheerio from 'cheerio'
import rp from 'request-promise'
import Path from 'path'
import fs from 'fs'

const getDetails = (res, cookieJar) => {
	return new Promise((resolve) => {
		if (res.statusCode === 200) {
			const $ = cheerio.load(res.body)
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
							let value = elem.next.data
							value = value.replace(/\t/g, '')
							value = value.replace(/\n/g, '')
							value = value.replace(/ {2}/g, '')
							let title = $(this).text()
							title = title.replace(/\s+/g, '')
							data[title] = value
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
								dataRow.course = $(elem).text()
								break
							case 1:
								dataRow.credit = $(elem).text()
								break
							case 2:
								dataRow.type = $(elem).text()
								break
							case 3:
								dataRow.completed = $(elem).text()
								break
							case 4:
								dataRow.grade = $(elem).text()
								break
							case 5:
								dataRow.earned = $(elem).text()
								break
							case 6:
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
			resolve(data)
		}
	})
}
export const getStudentDetails = async (req, res) => {
	let cookieJar = request.jar()
	console.log(req.body.userid)
	let options = {
		method: 'POST',
		uri: 'https://app.ktu.edu.in/login.jsp',
		jar: cookieJar,
		simple: false,
		form: {
			username: req.body.userid,
			password: req.body.password
		},
		headers: {
			'cache-control': 'no-cache',
			'content-type': 'application/x-www-form-urlencoded',
			'User-Agent':
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Mobile Safari/537.36'
		},
		followAllRedirects: true,
		resolveWithFullResponse: true
	}
	try {
		let response = await rp(options)
		let data = await getDetails(response, cookieJar)
		res.json(data)
	} catch (e) {
		console.log(e)
		res.status(403).send({ status: 'error' })
	}
}

export const getNotifications = (req, res) => {
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
			console.log(err)
		})
}

const getImg = (url, cookieJar, userid) => {
	if (userid) {
		const path = Path.resolve('/var/www', 'proimg', userid + '.jpg')
		console.log(path)
		request({
			uri: url,
			jar: cookieJar,
			resolveWithFullResponse: true
		}).pipe(fs.createWriteStream(path))
	}
}

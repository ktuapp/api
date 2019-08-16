import { Router } from 'express'
import getStudentDetails from '../controllers/studentDetails'
import getNotifications from '../controllers/notifications'
import { sendNotification } from '../core/firebase'
import { validateRequest } from '../middleware'

const router = Router()

const data = {
  click_action: 'FLUTTER_NOTIFICATION_CLICK',
  date: 'Thu Aug 15 00:00:00 IST 2019',
  heading: 'B.Tech S4 Exam May 2019 - Result published',
  key: 'btech-s4-exam-may-2019-result-published',
  data: ' It is here by notified that the result of B.Tech S4 (R,S) Exam May 2019 is published. The detailed results are available in the KTU website www.ktu.edu.in.Students can apply for answer script copy and revaluation, by registering in the KTU web portal from 19.08.2019, Monday to 23.08.2019, Friday.The Fee for answer script copy is Rs.500/- per answer script and for revaluation, Rs. 600/- per answer script. Students should submit their requests through student login and pay the fee at College office on or before 23.08.2019, Friday.'
}

router.get('/', (req, res) => res.json({ status: 'working' }))
router.get('/test', (req, res) => {
  sendNotification(data,
    { 'title' : data.heading, 'body': data.data.substring(0,100).concat('...') },
    'ktu_notification')
  return res.json({ status: 'working' })
})
router.post('/api/v1/data', validateRequest, getStudentDetails)
router.get('/api/v1/notifications', getNotifications)

export default router

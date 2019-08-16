import { Router } from 'express'
import getStudentDetails from '../controllers/studentDetails'
import getNotifications from '../controllers/notifications'
import getNotes from '../controllers/notes'
import { validateRequest } from '../middleware'

const router = Router()

router.get('/', (req, res) => res.json({ status: 'working' }))
router.post('/api/v1/data', validateRequest, getStudentDetails)
router.get('/api/v1/notifications', getNotifications)
router.get('/api/v1/notes', getNotes)

export default router

import { Router } from 'express'
import { getStudentDetails, getNotifications } from '../controllers/studentDetailsController'
import { validateRequest } from '../middleware'

const router = Router()

router.get('/', (req, res) => res.json({ status: 'working' }))
router.post('/api/v1/data', validateRequest, getStudentDetails)
router.get('/api/v1/notifications', getNotifications)
export default router

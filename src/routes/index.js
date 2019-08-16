import { Router } from 'express'
import getStudentDetails from '../controllers/studentDetails'
import getNotifications from '../controllers/notifications'
import { showNotes, showBranches, showSemesters, showSubjects, addNote } from '../controllers/notes'
import { validateRequest } from '../middleware'

const router = Router()

router.get('/', (req, res) => res.json({ status: 'working' }))
router.post('/api/v1/data', validateRequest, getStudentDetails)
router.get('/api/v1/notifications', getNotifications)
router.post('/api/v1/notes/subjects', showSubjects)
router.post('/api/v1/notes/semesters', showSemesters)
router.post('/api/v1/notes/branches', showBranches)
router.post('/api/v1/notes/notes', showNotes)
router.post('/api/v1/notes.save', addNote)

export default router

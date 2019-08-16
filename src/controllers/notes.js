import { Notes } from '../core/mongo'
import { SEMESTERS, BRANCHES, SUBJECTS } from '../utils/constants'

export const showNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ subject: 'coa', module: 1 })
    res.json({ notes: notes })
  } catch (err) {
    console.error(err)
  }
}

export const showSemesters = async (req, res) => {
  try {
    res.json({ semesters: SEMESTERS })
  } catch (err) {
    console.error(err)
  }
}

export const showBranches = async (req, res) => {
  try {
    res.json({ branches: BRANCHES })
  } catch (err) {
    console.error(err)
  }
}

export const showSubjects = async (req, res) => {
  try {
    const { semester, branch } = req.body
    const subjects = SUBJECTS.filter((s) => (s.semester === semester && s.branch === branch))
    res.json({ subjects: subjects })
  } catch (err) {
    console.error(err)
  }
}

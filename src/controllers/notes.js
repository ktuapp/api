/* eslint-disable no-console */
import { Notes } from '../core/mongo'
import { SEMESTERS, BRANCHES, SUBJECTS } from '../utils/constants'

export const showNotes = async (req, res) => {
  try {
    const { subject, module } = req.body
    const notes = await Notes.find({ subject: subject, module: module })
    res.json({ notes: notes })
  } catch (err) {
    console.error(err)
  }
}

export const addNote = async (req, res) => {
  try {
    const { subject, module, link } = req.body
    const note_data = {
      subject,
      module,
      link,
    }
    const notes = new Notes(note_data)
    await notes.save()
    res.json({ status: 'Saved successfully' })
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

/* eslint-disable no-console */
import { Notes } from '../core/mongo'
import { getS3file } from '../core/aws'
import { SEMESTERS, BRANCHES, SUBJECTS } from '../utils/constants'

export const showNotes = async (req, res) => {
  try {
    const { subject, module } = req.body
    const notes = await Notes.find({ subject: subject, module: module })
    const note_data = await Promise.all(notes.map(async (note) => {
      const url = await getS3file('cse/s2/coa/1/note1.pdf')
      return { note_details: note, url: url }
    }))
    res.json({
      notes: note_data
    })
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

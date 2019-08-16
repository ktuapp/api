import { Notes } from '../core/mongo'

const showNotes = async (req, res) => {
  try {
    const note_data = {
      semester: 'I',
      course: 'CS',
      module: 'Module 1',
      topic: 'Topic',
      link: 'http://google.com'
    }
    const notes = new Notes(note_data)
    await notes.save()
    res.json({ notes: note_data })
  } catch (err) {
    console.error(err)
  }
}

export default showNotes

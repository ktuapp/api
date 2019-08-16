import { Schema } from 'mongoose'

const noteSchema = new Schema({
  semester: {
    type: 'String'
  },
  course: {
    type: 'String'
  },
  module: {
    type: 'String'
  },
  topic: {
    type: 'String'
  },
  link: {
    type: 'string'
  }
})

export default noteSchema

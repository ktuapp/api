import { Schema } from 'mongoose'

const noteSchema = new Schema({
  subject: 'String',
  module: 'Number',
  link: 'String'
})

export default noteSchema

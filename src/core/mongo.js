/* eslint-disable no-console */
import mongoose from 'mongoose'
import noteSchema from '../schema/note'
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})

mongoose.connection.on('error', (error) => {
  console.error(error)
})

mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

export const Notes = mongoose.model('notes', noteSchema)

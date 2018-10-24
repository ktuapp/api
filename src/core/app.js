import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from '../routes'
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/', router)
export default app

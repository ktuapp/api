import * as admin from 'firebase-admin'
require('dotenv').config()

const serviceAccount = require('../../config/firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
})

export const sendNotification = async (data, topic) => {
  const message = {
    data,
    topic
  }
  try {
    await admin.messaging().send(message)
  } catch (e) {
    console.error('Some Error Occured')
  }
}

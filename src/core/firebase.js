import * as admin from 'firebase-admin'

const serviceAccount = require('../../config/firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
})

export const sendNotification = async (topic, data) => {
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

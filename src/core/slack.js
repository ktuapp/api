import { WebClient } from '@slack/web-api'
require('dotenv').config()

const token = process.env.SLACK_TOKEN
const web = new WebClient(token)
const conversationId = process.env.SLACK_CHANNEL

export const sendMessage = async (text) => {
  const res = await web.chat.postMessage({ channel: conversationId, text: text })
  console.log('Message sent: ', res.ts)
}


import redis from 'redis'
import { promisify } from 'util'

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST
})

client.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to redis')
})

client.on('error', function (err) {
  // eslint-disable-next-line no-console
  console.error('Error ' + err)
})

export const getAsync = promisify(client.get).bind(client)

export default client

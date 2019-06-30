import cron from 'node-cron'
import notification from './notification'

const startJobs = () => {
  cron.schedule('0 3,6,9,12 * * *', notification)
}

export default startJobs

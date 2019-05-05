import cron from 'node-cron'
import notification from './notification'

const startJobs = () => {
  cron.schedule('* */3 * * *', notification)
}

export default startJobs

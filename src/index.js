/* eslint-disable no-console */
import app from './core/app'
import client, { getAsync } from './core/redis'

const PORT = process.env.PORT || 3000
const startApp = () => {
  try {
    app.set('port', PORT)
    app.listen(app.get('port'), () => console.log(`Server Running http://localhost:${PORT}`))    
    // const expiry = new Date().setHours(48)
    // client.set('my string', 'this is a string', 'EX', expiry)

    // getAsync('my string').then((data) => {
    //   console.log(data)
    // })
		
  } catch (error) {
    console.error(`Error occured ${error}`)
  }
}

startApp()

/* eslint-disable no-console */
import app from './core/app'
import client, { getAsync } from './core/redis'

const PORT = process.env.PORT || 3000
const startApp = () => {
  try {
    app.set('port', PORT)
    app.listen(app.get('port'), () => console.log(`Server Running http://localhost:${PORT}`))    
    // const expiry = new Date().setHours(48)
    // client.setex('key1', 10, 'this is a string' )
    // client.setex('key2', 20, 'this is a string' )
    // client.expireat('hash key', 10)
    // client.hset('hash key', 'hashtest 1', 'some value')
    // setTimeout(() => client.hset('hash key', 'hashtest 2', 'some value 2'), 3000)


    // client.ttl('key1', (err, data) => { console.log(`Time key1 ${data}`) })
    // client.ttl('key2', (err, data) => { console.log(`Time key2 ${data}`) })

    // getAsync('my string').then((data) => {
    //   console.log(data)
    // })
		
  } catch (error) {
    console.error(`Error occured ${error}`)
  }
}

startApp()

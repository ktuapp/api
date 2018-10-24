import app from './core/app'
require('dotenv').config()

const PORT = process.env.PORT || 3000
const startApp = () => {
	try {
		app.set('port', PORT)
		app.listen(app.get('port'), () => console.log(`Server Running http://localhost:${PORT}`))
	} catch (error) {
		console.error(`Error occured ${error}`)
	}
}

startApp()

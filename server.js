require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT
const session = require('express-session')
const bodyParser = require('body-parser')

require('./db/db')




server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }))


server.use(session({
	secret: process.env.SESSION_SECRET, 
	resave: false, 
	saveUninitialized: false
}))


	

const authController = require('./controllers/authController')
server.use('/auth', authController)
const stateController = require('./controllers/stateController')
server.use('/states', stateController)
const userController = require('./controllers/userController')
server.use('/states', userController)


server.get('/', (req, res) => {
	const message = req.session.message
	req.session.message = ''
	res.render('home.ejs', {
		message: message
	})

})
	


server.get('*', (req, res) => {
	res.status(404).render('404.ejs')
})





server.listen(PORT, () => {
	const d = new Date()
	console.log(`${d.toLocaleString()}: Server is listening on port ${PORT}`);
})
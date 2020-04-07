const express = require('express')
const router = express.Router()
const User = require('../models/user')


// registration route: GET /auth/register
router.get('/register', (req, res) => {
	let messsageToDisplay = req.session.message
	req.session.message = ''
	res.render('auth/register.ejs', {
		message: messsageToDisplay
	})
})

router.post('/register', async (req, res, next) => {
	try{
		console.log(req.body);
		const desiredUsername = req.body.username
		const desiredPasssword = req.body.password
		const desiredEmailAddress = req.body.emailAddress
		const userWithThisEmailAddress = await User.findOne({
			emailAddress: desiredEmailAddress
		})
		const userWithThisUsername = await User.findOne({
			username: desiredUsername
		})
		console.log(userWithThisUsername);	
		if(userWithThisUsername){ // if user with this username or this  
			console.log(' username exists');
			req.session.message = `Username ${desiredUsername} already exists`
			res.redirect('/auth/register')
		} else if(userWithThisEmailAddress) {
			console.log('email exists');
			req.session.message = `An account with the email ${desiredEmailAddress} is already in use`
			res.redirect('/auth/register')
		} else {
			const createdUser = await User.create ({
				username: desiredUsername,
				password: desiredPasssword,
				emailAddress: desiredEmailAddress
			})
			req.session.loggedIn = true
			req.session.userId = createdUser._id
			req.session.username = createdUser.username
			res.status(201).send('successfully registered and logged in as ' + req.session.username)
		}
	} catch(err) {
		next(err)
	}
})


		
module.exports = router





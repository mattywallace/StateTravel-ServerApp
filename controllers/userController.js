const express = require('express')
const router = express.Router()
const State = require('../models/state')
const User = require('../models/user')




router.get('/:userId', async (req, res, next) => {

	try {
		const user = await User.findById(req.params.userId).populate('states')
		console.log(user, 'this is the user') ///taking out this populate will render but not print user)
		res.render('users/show.ejs', {
			user: user, 
			userId: user.id
		})
	} catch(error) {
	  next(error)
	}
})


// post new state to user
router.put('/:userId', async (req, res, next) => {
	try {
		const stateVisited = {
			state: req.body.state, 
			userId: req.session.user}
		const user = await User.findById(req.params.userId).populate('states')
		user.states.push(stateVisited)
		await user.save()
		res.locals.user = req.session.user
		res.render('users/show.ejs', {
			users: req.session.user,
			// states: req.body.state,
			// state: req.body.state,
			// states: req.params.stateId,
			// res.locals.states = req.session.states
			
		})
	} catch(error) {
	  next(error)
	}
})

	






module.exports = router
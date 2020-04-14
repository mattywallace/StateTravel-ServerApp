const express = require('express')
const router = express.Router()
const State = require('../models/state')
const User = require('../models/user')





router.get('/:userId', async (req, res, next) => {

	try {
		
		const user = await User.findById(req.params.userId).populate('states')
		const state = await State.findById(user.states._id).populate('state')
		console.log('this is the state we clicked', state);
		console.log('this is the user we found', user)
		console.log(user, 'this is the user') ///taking out this populate will render but not print user)
		res.render('users/show.ejs', {
			user: user.user,
			states: user.states,
			userId: user.id

		})
	} catch(error) {
	  next(error)
	}

})


// post new state to user
router.put('/:userId/:stateId', async (req, res, next) => {
	try {
		const stateVisited = await State.findById(req.params.stateId).populate('user')
		const user = await User.findById(req.params.userId)
		console.log("this is the state visited", stateVisited);
		user.states.push(stateVisited)
		await user.save()
		console.log('this is user.states the states array', user.states);
		res.locals.user = req.session.user
		res.redirect(`/users/${req.params.userId}`)
	} catch(error) {
	  next(error)
	}
})
			
			
		

	




module.exports = router







// // post new state to user
// router.put('/:userId', async (req, res, next) => {
// 	try {
// 		const stateVisited = {
// 			state: req.body.state, 
// 			userId: req.session.user}
// 		const user = await User.findById(req.params.userId).populate('states')
// 		user.states.push(stateVisited)
// 		await user.save()
// 		res.locals.user = req.session.user
// 		res.render('users/show.ejs', {
// 			users: req.session.user,
// 			// states: req.body.state,
// 			// state: req.body.state,
// 			// states: req.params.stateId,
// 			// res.locals.states = req.session.states
			
// 		})
// 	} catch(error) {
// 	  next(error)
// 	}
// })
const express = require('express')
const router = express.Router()
const State = require('../models/state')
const User = require('../models/user')




router.get('/:userId', async (req, res, next) => {
	try {
		// res.render('/stateList.ejs')
	res.send('route working')
	// console.log(req.params.userId, 'this is the user')
		// const statesForThisUser = await State.MyClass.findOne({user: req.params.userId}).populate('user')
		// const statesForThisUser = await State.findById({user: req.params.userId}).populate('user')
		// const user = await User.findById(req.params.userId) ///taking out this populate will render but not print user)
		// res.render('users/stateList.ejs', {
		// 	user: user, 
		// 	states: statesForThisUser, 
		// 	userId: user.id
		// })
	} catch(error) {
	  next(error)
	}
})


// post new state to user
router.post('/:userId', async (req, res, next) => {
	try {
		// res.send('route working')
		const stateVisited = {
			state: req.body.state,
			userId: req.session.userId,
		}
		const user = await User.findById(req.params.userId).populate('states')
		console.log(req.body.states)
		user.states.push(stateVisited)
		await user.save()
		res.send('user show page')
		res.render('/users/stateList.ejs')
	} catch(error) {
	  next(error)
	}
})





module.exports = router
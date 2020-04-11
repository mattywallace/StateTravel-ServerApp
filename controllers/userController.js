const express = require('express')
const router = express.Router()
const State = require('../models/state')
const User = require('../models/user')





router.get('/:userId', async (req, res, next) => {
	// res.send('this is the user show page)   state: ({})
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
		console.log(req.body.state._id)
		console.log(req.session)
		// console.log(req.body.states.id)
		console.log(state._id)

	// 	console.log(req.params.statesId)
	// 	console.log(req.params.userId)

		const foundUser = await User.findById(req.params.Id).populate('user')	
		console.log(foundUser)
			
	// res.send('this works')

})



// 	try {
// 		const user = await User.findById(req.params.userId).populate('states')
// 		const statesForThisUser = await State.findbyId(req.params.userId).populate('user')
// 		res.render('users/stateList.ejs', {
// 			user: user, 
// 			states: statesForThisUser, 
// 			userId: user.user
// 		})
	
// 	} catch(error) {
// 	  next(error)
// 	}
// })

module.exports = router
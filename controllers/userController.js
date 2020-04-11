const express = require('express')
const router = express.Router()
const State = require('../models/state')
const User = require('../models/user')




router.get('/:userId/states', (req, res) => {
	res.send(`this is the ${req.params.userId}`)
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
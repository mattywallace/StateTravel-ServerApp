const express = require('express')
const router = express.Router()
const State = require('../models/state')
const User = require('../models/user')




router.get('/:userId/states', async (req, res, next) => {
	try {
		const statesForThisUser = await State.find({user: req.params.userId}).populate('user')
		const user = await User.findById(req.params.userId)
		res.render('users/stateList.ejs', {
			user: user, 
			states: statesForThisUser, 
			userId: user.id
		})
	} catch(error) {
	  next(error)
	}
})






module.exports = router
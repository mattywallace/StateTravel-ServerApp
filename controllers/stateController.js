const express = require('express')
const router = express.Router()
const State = require('../models/state')

// state index route: GET /auth/register
router.get('/',  async (req, res, next ) => {
	try {
		const foundStates = await State().populate('user')
		console.log(foundStates)
		res.render('states/index.ejs', {
			states: foundStates
		})
	}catch(error) {
		next(error)
	}
})


// state show route: GET /states/:id

router.get






module.exports = router
const express = require('express')
const router = express.Router()
const State = require('../models/state')
const stateData = require('../db/stateData.js')
const User = require('../models/user')



// state SEED route
router.get('/seed', async (req, res, next) => {
	try {
		State.create(stateData, (error, createdStates) => {
			    if(error) {
		        console.log("There was an error");
		        console.log(error)
		    } else {
		        console.log("Here is the created State data")
		        console.log(createdStates)
		        res.send('/states data uploaded')
		    }
		})
	} catch(error) {
	  next(error)
	}
})



// state INDEX route: GET /auth/register
router.get('/', async (req, res, next ) => {
	try {
		let messsageToDisplay = req.session.message
    	req.session.message = ''
		const foundStates = await State.find({}).populate('user')
		// console.log(foundStates)
		res.render('states/index.ejs', {
			states: foundStates,
			userId: req.session.userId,
			user: req.session.user,
			message: messsageToDisplay,
			visited: req.session.visited

		})
	}catch(error) {
		next(error)
	}
})


// state SHOW route: GET /states/:id

router.get('/:id', async (req, res, next) => {
	try {
		let messsageToDisplay = req.session.message
    	req.session.message = ''
		const foundState = await State.findById(req.params.id)
			.populate('user')
   			.populate('comments.user')
		console.log(foundState)
		res.render('states/show.ejs', {
			state: foundState,
			userId: req.session.userId,
			user: req.session.user,
			message: messsageToDisplay
		})
	} catch(error) {
	  next(error)
	}
})















module.exports = router
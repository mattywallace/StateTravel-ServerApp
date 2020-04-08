const express = require('express')
const router = express.Router()
const State = require('../models/state')
const stateData = require('../db/stateData.js')


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
		        res.send('state data populated')
		    }
		})
	} catch(error) {
	  next(error)
	}
})



// state INDEX route: GET /auth/register
router.get('/',  async (req, res, next ) => {
	try {
		const foundStates = await State.find({})
		console.log(foundStates)
		res.render('states/index.ejs', {
			states: foundStates
		})
	}catch(error) {
		next(error)
	}
})


// state SHOW route: GET /states/:id

router.get('/:id', async (req, res, next) => {
	try {
		const foundState = await State.findById(req.params.id)
		console.log(foundState)
		res.render('states/show.ejs', {
			state: foundState
		})
	} catch(error) {
	  next(error)
	}
})






module.exports = router
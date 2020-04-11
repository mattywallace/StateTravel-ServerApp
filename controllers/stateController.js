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

//possibilities: /:userId/states
//this used to be /user:id
//state visited POST route
router.post('/:userId/', async (req, res, next) => {
	try {
		const stateVisited = {
			state: req.body.state,
			userId: req.session.userId,
		}
		const user = await User.findById(req.params.userId).populate('states')
		user.states.push(stateVisited)
		await user.save()
		res.send('user show page')
		// res.render('/users/stateList.ejs')
	} catch(error) {
	  next(error)
	}
})

// const user = await User.findById(req.params.userId).populate('user')

//route to say user has visited state
//populate state visited after button hit, push visited states to that users db
//use stateId to push to array
//add form w button to hit this route


// router.post('/:stateId', async (req, res, next) => {
// 	try {
// 		const state = await State.findById(req.params.stateId)
// 		const commentToCreate = {
// 			text: req.body.text,
// 			user: req.session.userId
// 		}
// 		state.comments.push(commentToCreate)
// 		await state.save()
// 		res.redirect('/states/' + state.id)
// 	} catch (err) {
// 		next (err)
// 	}
// })














module.exports = router
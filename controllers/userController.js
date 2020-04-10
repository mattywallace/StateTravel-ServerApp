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

//NEED TO FIND OUT HOW TO REFERENCES USER'S STATES FROM THE USER MODEL IN THE CONTROLLER
// post new state to user
router.put('/:userId', async (req, res, next) => {
	// try {
		
	// 	// const stateToAddToShowPage = {states: req.body.states}
	// 	// console.log(stateToAddToShowPage)
	// 	console.log(req.body.state)
	// 	const statesVisited = await User.findById(req.params.userId).populate('states')
	// 	console.log(statesVisted)
	// 	user.states.push(statesVisited)
	// 	await user.save()
	// 	// res.send('user show page')
	// 	res.render('users/show.ejs',{
	// 		states: req.body.state
	// 	})
	// } catch(error) {
	//   next(error)
	// }
	res.send('this works')

})


// // EXPERIMENTAL POST ROUTE:
// router.post('/:userId', async (req, res, next) => {
//   try {
//     // res.send('route working')
//     const stateClickedOn = req.body.state
//     console.log(req.session.userId)   //PRINTS
//     console.log(req.session.user) //PRINTS
//     const stateVisited = await State.findById(req.body.id)
//     // const stateVisited = await State.findById(req.params.states)
//     console.log(stateVisited, 'here is the state visited')
//     console.log(req.body.states)
//     const user = await User.findById(req.params.userId).populate('states')
//     console.log(req.body.states)
//     user.states.push(stateVisited)
//     await user.save()
//     res.send('user show page')
//     res.render('users/show.ejs')
//   } catch(error) {
//     next(error)
//   }
// })




module.exports = router
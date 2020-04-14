const express = require('express')
const router = express.Router()
const State = require('../models/state')
const Comment = require('../models/comment')

router.post('/:stateId', async (req, res, next) => {
	try {
		const state = await State.findById(req.params.stateId)
		const commentToCreate = {
			text: req.body.text,
			user: req.session.userId
		}
		state.comments.push(commentToCreate)
		await state.save()
		res.redirect('/states/' + state.id)
	} catch (err) {
		next (err)
	}
})




// Destroy route 
router.delete('/:stateId/:commentId', async (req, res, next) => { 
	try { 
		if(req.session.loggedIn == true ) {
			console.log('this is req.session.id',req.session.id);
			console.log('this is req.body', req.body);
			console.log('this is req.params', req.params)
			const commentToDelete = await State.findById(req.params.stateId).populate('comments')
			console.log( 'this is the comment to delete ', commentToDelete);
			res.redirect(`/states/${req.params.stateId}`)
		} else {
			res.redirect(`/states/${req.params.stateId}`)
		}

	} catch(err) {
		next(err)
	}
})


module.exports = router;
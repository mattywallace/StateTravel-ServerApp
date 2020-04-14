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
			console.log('this is req.body', req.body);
			console.log('this is req.params', req.params)
			const foundState = await State.findById(req.params.stateId).populate('user')
			await Comment.findByIdAndRemove(req.params.commentId)
			const index = foundState.comments.findIndex(comment => {
				if(comment._id == req.params.commentId) {
					return true
				} 
			})
			foundState.comments.splice(index, 1)
			await foundState.save()
			res.redirect(`/states/${req.params.stateId}`)
		} else {
			res.redirect(`/states/${req.params.stateId}`)
		}

	} catch(err) {
		next(err)
	}
})


module.exports = router;
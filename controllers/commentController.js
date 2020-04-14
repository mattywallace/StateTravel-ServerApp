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
			// console.log('this is req.session.id',req.session.id);
			console.log('this is req.body', req.body);
			console.log('this is req.params', req.params)

			//go into this states comments (state.comments)/use array methods to find and remove comment that has the Id that you want to delete
			//use .save() because you changed the array manually
			const foundState = await State.findById(req.params.stateId).populate('user')
			// const foundCommentId = await Comment.findById(req.params.commentId).populate('comments')
			await Comment.findByIdAndRemove(req.params.commentId)
			//go into state's comments, and use array methods to remove comment in state
			//1 findIndex to get index
			const index = foundState.comments.findIndex(comment => {
				if(comment._id == req.params.commentId) {
					return true
				} 
			})
			//2 use splice to remove
			foundState.comments.splice(index, 1)
			
			await foundState.save()

			res.redirect(`/states/${req.params.stateId}`)

			// console.log( 'this is the comment to delete ', commentToDelete);
			// res.redirect(`/states/${req.params.stateId}`, {
			// 	state: req.params.stateId
			// })

		} else {
			res.redirect(`/states/${req.params.stateId}`)
		}

	} catch(err) {
		next(err)
	}
})


module.exports = router;
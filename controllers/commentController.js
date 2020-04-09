const express = require('express')
const router = express.Router()
const State = require('../models/state')

router.post('/:stateId', async (req, res, next) => {
	try {
		const state = await State.findById(req.params.StateId)
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



module.exports = router;
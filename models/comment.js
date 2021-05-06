const mongoose = require('mongoose')



const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		req: true, 
	},
	posted: {
		type: Date,
		default: Date.now
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	},	
	state:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'State'
	}

})

//user.user

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment

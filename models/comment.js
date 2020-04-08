const mongoose = require('mongoose')



const commentSchema = new mongoose.Schema({
	title : {
		type: String,
		required: true
	},
	body: {
		type: String,
		req: true, 
	},
	posted: {
		type: Date,
		default: Date.now
	},
	user:{
		type:mongoose.Schema.Types.ObjectId
		ref:'User'
	},	
	state:{
		type: mongoose.Schema.Types.ObjectId
		ref:'State'
	}

})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment

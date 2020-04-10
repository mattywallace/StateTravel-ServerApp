
const mongoose = require('mongoose')
const Comment = require('./comment')


const stateSchema = new mongoose.Schema({
	state: {
		type: String,
		required: true
	},
	capital: {
		type: String,
		required: true, 
	},
	population: {
		type: Number,
		required: true
	},
	topAttractions: [String],
	stateBird: String, 
	birdImage: String, 
	comments: [Comment.schema]


})





const State = mongoose.model('State', stateSchema)

module.exports = State
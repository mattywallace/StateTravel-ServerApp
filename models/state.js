
const mongoose = require('mongoose')



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
	visited: Boolean,
	comment:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	}]

})




const State = mongoose.model('State', stateSchema)

module.exports = State
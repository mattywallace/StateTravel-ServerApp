
const mongoose = require('mongoose')





const stateSchema = new mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	capital: {
		type: String,
		req: true, 
	},
	population: {
		type: Number,
		required: true
	},
	topAttractions: [String],
	stateBird: String,
	comment:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]

})

const State = mongoose.model('State', stateSchema)

module.exports = State
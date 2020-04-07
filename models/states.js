
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
		type: Number
		required: 
	},
	topAttractions: [String],
	stateBird: String,

})

module.exports = State
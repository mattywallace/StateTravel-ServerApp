const mongoose = require('mongoose')
const State = require('../models/state')

const userSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true 
	},
	password: {
		type: String, 
		required: true 
	},
	emailAddress: {
		type: String, 
		required: true  
	}, 
	firstName: String, 
	lastName: String,
	dateOfBirth: Date,
	states: [{
	type: mongoose.Schema.Types.ObjectId,
	ref:'State'
	}],
})


const User = mongoose.model('User', userSchema)

module.exports = User

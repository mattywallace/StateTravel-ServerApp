const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	username: {
	type: String,
	required: true, 
	},
	password: {
		type: String, 
		required: true, 
	},
	emailAdress: {
		type: String, 
		required: true  
	}, 
	firstname: String, 
	lastname: String,
	dateOfBirth: Date,
})

module.exports = User
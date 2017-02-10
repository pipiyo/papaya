let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let userSchema = new Schema({
	name: String,
	password: String,
	type: String,
	profile_picture: String,
	employee: {
		rut: String,
		name: String,
		last_name: String,
		second_name: String,
		email: String,
		phone: String,
		mobile: String,
		department: String,
		distric: String,
		nationality: String,
		position: String,
		address: String
	},
	notifications: [{ type: Schema.Types.ObjectId, ref: 'notification' }]
})

let user = mongoose.model('user', userSchema)

module.exports = user
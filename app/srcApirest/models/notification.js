let mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let notificationSchema = new Schema({
	user: String,
	date: {type: Date, default: new Date() },
	slug: String,
	area: String
})

let notification = mongoose.model("notification", notificationSchema)

module.exports = notification
let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let notificationSchema = new Schema({
	user: String,
	create_at: {type: Date, default: new Date() },
	slug: String,
	area_servicio: String,
	codigo_servicio: String,
	categoria_servicio: String,
	read_by: [ { user: String, read_at: new Date() } ]
})

let notification = mongoose.model("notification", notificationSchema)

module.exports = notification
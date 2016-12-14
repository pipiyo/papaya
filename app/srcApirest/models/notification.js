let mongoose = require("mongoose")

//let redis = require("redis")

//let pub = redis.createClient()

mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let notificationSchema = new Schema({
	user: String,
	create_at: {type: Date, default: new Date() },
	slug: String,
	area: String,
	asset: {
		codigo: String,
		categoria: String
	},
	read_by: [ { user: String, read_at: {type: Date, default: new Date() } } ]
})


notificationSchema.pre('save', function (next) {

	//pub.publish('notification', 'hola bld')

	next()
})



let notification = mongoose.model('notification', notificationSchema)

module.exports = notification
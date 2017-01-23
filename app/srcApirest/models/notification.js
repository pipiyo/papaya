let mongoose = require('mongoose')
const PubSub = require('pubsub-js')

mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let notificationSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	create_at: { type : Date, default: Date.now },
	slug: String,
	area: { type: Schema.Types.ObjectId, ref: 'area' },
	asset: {
		tipo: String,
		rocha: String,
		codigo: String,
		categoria: String
	},
	read_by: []
})


notificationSchema.pre('save', function (next) {

	PubSub.publish( 'notification', this._id )

	next()
})



let notification = mongoose.model('notification', notificationSchema)

module.exports = notification
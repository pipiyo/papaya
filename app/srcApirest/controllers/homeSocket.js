const Notification = require('../models/notification')
const Content = require('../models/content')
const PubSub = require('pubsub-js')
const User = require('../models/user')
const decodeToken = require('./decodeToken')

const Area = require('../models/area')

module.exports = (io) => {

  io
  .of('/home')
  .on('connection', (socket) => {


/*
	  socket.on('getContentUser', (callback) => {
	  	let user = decodeToken( JSON.stringify( global.token ) )
	  	callback(user)
	  })
	  socket.on('getContent', (callback) => {
		Content.
		  find({}).
		  exec( (err, n) => {
		  	if (err) console.log(err)
			callback(n)
		  })
	  })
	  socket.on('getNumberNotification', (callback) => {
		Notification.
		  find({ 'read_by': { $ne: global.userName } }).
		  count().
		  exec( (err, n) => {
		  	if (err) console.log(err)
		  		callback(n)
		  })
	  })
*/

	  socket.on('getContent', (type, callback) => {
	  	/*
		Content.
		  find({}).
		  exec( (err, n) => {
		  	if (err) console.log(err)
			return n
		  }).then( (n) => {

		  		Notification.
				  find({ 'read_by': { $ne: global.userName } }).
				  count().
				  exec( (err, number) => {
				  	if (err) console.log(err)
				  		let user = (global.token) ? decodeToken( JSON.stringify( global.token ) ) : { name: null, profile_picture: null }
				  		callback(n, user, number)
				  })
		  })
*/

				Area.
				  findOne({ id_name: `${type}` }).
				  populate('items').
				  exec( (err, a) => {
				  	if (err) console.log(err)
					callback( a.items, null, null )
				  })


	  })


	  socket.on('getNotification', (callback) => {

		Notification.
			update( { }, 
						 { $addToSet: 
						 	{ read_by: global.userName 
						 	}  
					 }, 
					 {multi: true},
					  function (err, tank) {
						  if (err) console.log( err )
		})

		Notification.
		  find({}).
		  limit(5).
		  populate('user area').
		  sort('-create_at').
		  exec( (err, notification) => {
		  	if (err) console.log( err )
		  	callback(notification)
		  })
	  })

	 	PubSub.subscribe('notification', function( msg, data ){

			Notification.
			  find({ 'read_by': { $ne: global.userName } }).
			  populate('user area').
			  count().
			  exec( (err, notification) => {
			  	if (err) console.log(err)
			  	socket.broadcast.emit('popupNotification', notification)
			  })

	 	})

  })


}
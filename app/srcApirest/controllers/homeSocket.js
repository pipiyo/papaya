const Notification = require('../models/notification')
const PubSub = require('pubsub-js')

module.exports = (io, UserSession) => {

  io
  .of('/home')
  .on('connection', (socket) => {


	  socket.on('getNumberNotification', (user, callback) => {

		Notification.
		  find({ 'read_by': { $ne: user } }).
		  count().
		  exec( (err, n) => {
		  	if (err) console.log(err)
		  	callback(n)
		  })

	  })

	  socket.on('getNotification', (user, callback) => {

		Notification.
			update( { }, 
						 { $addToSet: 
						 	{ read_by: user 
						 	}  
					 }, 
					 {multi: true},
					  function (err, tank) {
						  if (err) console.log( err )
		})

		Notification.
		  find({}).
		  limit(5).
		  sort('-create_at').
		  exec( (err, notification) => {
		  	if (err) console.log( err )
		  	callback(notification)
		  })
	  })

	 	PubSub.subscribe('notification', function( msg, data ){

			Notification.
			  find({ 'read_by': { $ne: UserSession.name } }).
			  count().
			  exec( (err, notification) => {
			  	if (err) console.log(err)
			  	socket.broadcast.emit('popupNotification', notification)
			  })

	 	})

  })


}
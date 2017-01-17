const Notification = require('../models/notification')
const Area = require('../models/area')
const PubSub = require('pubsub-js')

module.exports = (io) => {

  io
  .of('/home')
  .on('connection', (socket) => {

	  socket.on('getAreas', (callback) => {
		Area.
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
		  populate('user').
		  sort('-create_at').
		  exec( (err, notification) => {
		  	if (err) console.log( err )
		  	callback(notification)
		  })
	  })

	 	PubSub.subscribe('notification', function( msg, data ){

			Notification.
			  find({ 'read_by': { $ne: global.userName } }).
			  populate('user').
			  count().
			  exec( (err, notification) => {
			  	if (err) console.log(err)
			  	socket.broadcast.emit('popupNotification', notification)
			  })

	 	})

  })


}
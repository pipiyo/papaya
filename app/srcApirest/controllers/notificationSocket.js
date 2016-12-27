const Notification = require('../models/notification')

module.exports = (io) => {

  io
  .of('/home')
  .on('connection', (socket) => {

	  socket.on('getNotification', (callback) => {

		Notification.
		  find({}).
		  limit(5).
		  exec( (err, notification) => {
		  	if (err) return handleError(err)

		  	callback(notification)

		  })

	  })

  })


}
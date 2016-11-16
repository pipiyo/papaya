module.exports = (io, request, Store) => {

  io
  .of('/login')
  .on('connection', (socket) => {

    socket.on('login', ( data, callback) => {
        request.post({
          uri: process.env.apiLogin,
          form: {
            user: data.userName,
            pass: data.pass
          }
        }, (error, response, auht) => {
          console.log( error )
          if (error) throw error
            auht = JSON.parse(auht)
          if(auht.on){
            socket.request.session.name = auht.name
            socket.request.session.type = auht.type
            socket.request.session.save()
            auht.on = socket.request.sessionID
            callback(auht)
          }else{
            callback(false)
          }
        })
    })

    socket.on('checkUser', (data, callback) => {
        Store.get( data, (err, session) =>{
          if (err) throw err
          if (session) {
            callback( session.name, session.type, data )
          } else {
           callback( session, session, session ) 
          }
        })
    })


  })

}
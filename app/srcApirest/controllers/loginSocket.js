const jwt = require('jwt-simple')
const moment = require('moment')

module.exports = (io, request) => {

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
          if (error) throw error
            auht = JSON.parse(auht)
          if(auht.on){
            
            let token = { token: jwt.encode( { name: `${auht.name}`, type: `${auht.type}`, expire: `${moment().format('h:mm:ss')}` }, 'xxx'), name: `${auht.name}`, type: `${auht.type}`}

            callback(token)
          }else{
            callback(false)
          }
        })
    })

/*
    socket.on('checkUser', (token, callback) => {

        token = JSON.parse(token)
        
          if (token) {
            try {
              let decode = jwt.decode(token, 'xxx')

              callback(token)

            } catch (err) {
              return callback(false)
            }
          } else {
            callback(false)
          }
    })
*/

  })

}
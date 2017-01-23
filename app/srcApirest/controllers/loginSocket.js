const jwt = require('jwt-simple')
const moment = require('moment')
const User = require('../models/user')
const pokemonGif = require('pokemon-gif')

module.exports = (io, request) => {

  io
  .of('/login')
  .on('connection', (socket) => {

    socket.on('checkUser', (token, callback) => {
      if (global.token == token && !(token == null) ) {
        callback(true)
      } else{
        global.token = null
        global.userName = null
        callback(false)
      }
    })

    socket.on('checkToken', (token, callback) => {
      if (global.token == token && !(token == null) ) {
        callback(true)
      } else{
        global.token = null
        global.userName = null
        callback(false)
      }
    })

    socket.on('login', ( data, callback, token = null) => {

User.
  findOne({ name: data.userName }).
  exec( (err, user) => {
    if (err) throw err

    if (user) {

      if (user.password == data.pass) {

        token = jwt.encode( { 
                              name: `${user.name}`, 
                              type: `${user.type}`, 
                              expire: `${moment().format('h:mm:ss')}`,
                              profile_picture: `${user.profile_picture}` }, 
                              global.secret)

        global.token = token
        global.userName = user.name

        callback({ 
                    token: token,
                    name: `${user.name}`, 
                    type: `${user.type}`, 
                    full_name: `${user.employee.name} ${user.employee.last_name} ${user.employee.second_name}`, 
                    profile_picture: `${user.profile_picture}`
                  })
      

      } else {
        callback(false)
      }

    } else {

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


            let user = new User({ 
                                  name: auht.name,
                                  password: data.pass,
                                  type: auht.type,
                                  profile_picture: `${pokemonGif(Math.floor(Math.random() * 150) + 1)}`,
                                  employee: {
                                    rut: auht.employee.rut,
                                    name: auht.employee.name,
                                    last_name: auht.employee.last_name,
                                    second_name: auht.employee.second_name,
                                    email: auht.employee.email,
                                    phone: auht.employee.phone,
                                    mobile: auht.employee.mobile,
                                    department: auht.employee.department,
                                    distric: auht.employee.distric,
                                    nationality: auht.employee.nationality,
                                    position: auht.employee.position,
                                    address: auht.employee.address
                                  }
                                  })

                  user.save().then( (doc) => {

                  token = jwt.encode( { 
                                        name: `${doc.name}`, 
                                        type: `${doc.type}`, 
                                        expire: `${moment().format('h:mm:ss')}`,
                                        profile_picture: `${doc.profile_picture}` }, 
                                        global.secret )

                  global.token = token
                  global.userName = doc.name

                    callback({ 
                                token: token,
                                name: `${doc.name}`, 
                                type: `${doc.type}`, 
                                full_name: `${doc.employee.name} ${doc.employee.last_name} ${doc.employee.second_name}`, 
                                profile_picture: `${doc.profile_picture}` 
                              })


                  }, (error) => {
                    console.log( error )
                    callback(false)
                  })


          }else{

            callback(false)

          }
        })

    }

  } )




/*
        request.post({
          uri: process.env.apiLogin,
          form: {
            user: data.userName,
            pass: data.pass
          }
        }, (error, response, auht) => {
          if (error) throw error
            auht = JSON.parse(auht)
            console.log( auht )
          if(auht.on){
            
            let token = { token: jwt.encode( { name: `${auht.name}`, type: `${auht.type}`, expire: `${moment().format('h:mm:ss')}` }, 'xxx'), name: `${auht.name}`, type: `${auht.type}`}

            callback(token)
          }else{
            callback(false)
          }
        })
*/



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